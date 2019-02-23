package phystech.services

import java.util.UUID

import io.finch.{BadRequest, Ok}
import io.finch._
import monix.eval.Task
import monix.execution.Scheduler
import phystech.responses.{ChangeModelResponse, ModelSummary, NewModelResponse, VariableNameWrapper}
import io.circe.generic.auto._
import io.finch.circe._
import phystech.data.{Model, Variable}
import phystech.requests.{ChangeModelRequest, NewModelRequest}
import phystech.storage.mongo.MongoBase
import shapeless.HList

class ModelsService(implicit mongo: MongoBase, scheduler: Scheduler) extends Endpoint.Module[Task] {

  final def getListOfModels: Endpoint[Task, Seq[ModelSummary]] =
    get("getListOfModels") { () =>
      mongo.getAllModels.map(_.map(ModelSummary.fromModel)).map(Ok)
    }

  final def getListOfVariables: Endpoint[Task, Seq[Variable]] =
    get("getListOfVariables") { () =>
      mongo.getAllVariables.map(Ok)
    }

  final def getModel: Endpoint[Task, Model] =
    get("getModel" :: param[String]("modelId")) { id: String =>
      println(s"getModel: $id")
      mongo.getModel(id).map(Ok)
    }

  final def newModel: Endpoint[Task, NewModelResponse] =
    post("newModel" :: jsonBody[NewModelRequest]) { body: NewModelRequest =>
      println(s"newModel: $body")
      val fetchVersion: Task[Long] =
        body
          .parentModelId
          .map(parentId => mongo.getModelFamily(parentId).map(_.map(_.version).max + 1))
          .getOrElse(Task.pure(0L))

      for {
        version <- fetchVersion
        id = UUID.randomUUID().toString
        model = Model(
          modelId = id,
          parentModelId = body.parentModelId.getOrElse(id),
          modelName = body.modelName,
          version = version,
          testingStage = 0,
          variableList = body.variableList
        )
        _ <- mongo.createModel(model)

      } yield Ok(NewModelResponse(id))
    }

  final def newVariable: Endpoint[Task, VariableNameWrapper] =
    post("newVariable" :: jsonBody[Variable]) { body: Variable =>
      println(s"newVariable: $body")
      mongo.createVariable(body).map(_ => Ok(VariableNameWrapper(body.variableName)))
    }

  final def changeModel: Endpoint[Task, ChangeModelResponse] =
    post("changeModel" :: jsonBody[ChangeModelRequest]) { body: ChangeModelRequest =>
      println(s"changeModel: $body")
      Ok(ChangeModelResponse("497", "319", 4))
    }

  final def changeVariable: Endpoint[Task, VariableNameWrapper] =
    post("changeVariable" :: jsonBody[Variable]) { body: Variable =>
      println(s"changeVariable $body")
      Ok(VariableNameWrapper(body.variableName))
    }

  final def combine[ES <: HList, CTS <: HList](bootstrap: Bootstrap[ES, CTS]) = Bootstrap
    .serve[Application.Json](
      (getListOfModels :+: getListOfVariables :+: getModel :+:
          newModel :+: newVariable :+: changeModel :+:
          changeVariable) handle {
        case e: Exception =>
          println(s"Error: $e")
          BadRequest(e)
      }
    )
}
