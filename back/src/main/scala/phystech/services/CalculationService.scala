package phystech.services

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
import phystech.data.Model
import phystech.responses.CalculateModelResponse
import shapeless.HList

class CalculationService(implicit mongo: MongoBase, scheduler: Scheduler) extends Endpoint.Module[Task] {

  private def getModel(modelId: String): Task[Model] = ???

  def calculateModel: Endpoint[Task, CalculateModelResponse] =
    post("calculateModel" :: jsonBody[CalculateModelRequest]) { body: CalculateModelRequest =>
      for {
        currentModelId <- mongo.getCurrentModel(body.parentModelId).map(_.currentModelId)
        model <- mongo.getModel(currentModelId)
        result = CalculateModel.apply(model, body.variableList.map(v => v.variableName -> v.variableValue).toMap)
        missingFields = model.variableList.map(_.variableName).diff(body.variableList.map(_.variableName))
      } yield Ok(CalculateModelResponse(result, missingFields))
    }

  final def combine[ES <: HList, CTS <: HList](bootstrap: Bootstrap[ES, CTS]) = bootstrap
    .serve[Application.Json](
    (calculateModel) handle {
      case e: Exception =>
        println(s"Error: $e")
        BadRequest(e)
    }
  )
}
