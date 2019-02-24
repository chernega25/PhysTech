package phystech.services

import java.time.{Instant, LocalDateTime}
import java.util.UUID

import io.finch.Endpoint
import monix.eval.Task
import monix.execution.Scheduler
import phystech.requests.CalculateModelRequest
import phystech.storage.mongo.MongoBase
import io.finch._
import io.circe.generic.auto._
import io.finch.circe._
import monix.catnap.MVar
import phystech.calculate.CalculateModel
import phystech.data.{Model, Request, RequestVariable}
import phystech.responses.CalculateModelResponse
import phystech.services.CalculationService.CacheEntry
import phystech.storage.clickhouse.ClickHouseBase
import shapeless.HList

class CalculationService(
  private val mvar: MVar[Task, Map[String, CacheEntry]]
)(
  implicit mongo: MongoBase,
  clickHouse: ClickHouseBase,
  scheduler: Scheduler
) extends Endpoint.Module[Task] {

  private val cacheTtlSeconds = 1000

  private def updateCache(parentId: String): Task[Model] = for {
      currentModelId <- mongo.getCurrentModel(parentId).map(_.currentModelId)
      model <- mongo.getModel(currentModelId)
      cache <- mvar.take
      _ <- mvar.put(cache.updated(parentId, CacheEntry(model, Instant.now.plusSeconds(cacheTtlSeconds))))
    } yield model

  private def getModel(parentId: String): Task[Model] = for {
    cache <- mvar.read
    model <- cache.get(parentId) match {
        case Some(CacheEntry(model, bestBefore)) if bestBefore.isAfter(Instant.now()) =>
          println("CalculationService: cache hit")
          Task.pure(model)
        case _ =>
          println("CalculationService: cache miss")
          updateCache(parentId)
      }
  } yield model

  def calculateModel: Endpoint[Task, CalculateModelResponse] =
    post("calculateModel" :: jsonBody[CalculateModelRequest]) { body: CalculateModelRequest =>
      for {
        model <- getModel(body.parentModelId)
        result = CalculateModel.apply(model, body.variableList.map(v => v.variableName -> v.variableValue).toMap)
        missingFields = model.variableList.map(_.variableName).diff(body.variableList.map(_.variableName))
        request = Request(UUID.randomUUID().toString, result, model.parentModelId, model.modelId, LocalDateTime.now())
        _ <- clickHouse.write(request.toInsertQuery)
        _ <- Task.sequence(
              body.variableList.map(
                variable => clickHouse.write(
                  RequestVariable(request.id, variable.variableName, variable.variableValue).toInsertQuery
                )
              )
            )
      } yield Ok(CalculateModelResponse(result, missingFields))
    }

  def invalidateCache: Endpoint[Task, Unit] =
    post("invalidateCache" :: param[String]("parentModelId")) { parentId: String =>
      for {
        cache <- mvar.take
        _ <- mvar.put(cache - parentId)
      } yield Ok(())
    }

  final def combine[ES <: HList, CTS <: HList](bootstrap: Bootstrap[ES, CTS]) = bootstrap
    .serve[Application.Json](
    (calculateModel :+: invalidateCache) handle {
      case e: Exception =>
        println(s"Error: $e")
        BadRequest(e)
    }
  )
}

object CalculationService {
  case class CacheEntry(model: Model, bestBefore: Instant)

  def mkCalculationService(implicit mongo: MongoBase, clickHouse: ClickHouseBase, scheduler: Scheduler): Task[CalculationService] =
    for {
      mvar <- MVar.of[Task, Map[String, CacheEntry]](Map())
    } yield new CalculationService(mvar)
}