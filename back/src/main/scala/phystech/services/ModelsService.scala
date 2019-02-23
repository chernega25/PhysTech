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
      val id = UUID.randomUUID().toString
      val model = Model(
        modelId = id,
        parentModelId = id,
        modelName = body.modelName,
        version = 0L,
        testingStage = 0,
        variableList = body.variableList
      )
      mongo.createModel(model).map(_ => Ok(NewModelResponse(id)))
    }

  final def newVariable: Endpoint[Task, VariableNameWrapper] =
    post("newVariable" :: jsonBody[Variable]) { body: Variable =>
      println(s"newVariable: $body")
      mongo.createVariable(body).map(_ => Ok(VariableNameWrapper(body.variableName)))
    }

  final def changeModel: Endpoint[Task, ChangeModelResponse] =
    post("changeModel" :: jsonBody[ChangeModelRequest]) { body: ChangeModelRequest =>
      println(s"changeModel: $body")
      for {
        oldModel <- mongo.getModel(body.modelId)
        id = UUID.randomUUID().toString
        version <- mongo.getModelFamily(oldModel.parentModelId).map(_.map(_.version).max + 1)
        model = Model(
          modelId = id,
          parentModelId = oldModel.parentModelId,
          modelName = body.modelName,
          version = version,
          testingStage = 0,
          variableList = body.variableList
        )
        _ <- mongo.createModel(model)
      } yield Ok(ChangeModelResponse(id, oldModel.parentModelId, version))
    }

  final def changeVariable: Endpoint[Task, VariableNameWrapper] =
    post("changeVariable" :: jsonBody[Variable]) { body: Variable =>
      println(s"changeVariable $body")
      mongo.updateVariable(body).map(_ => Ok(VariableNameWrapper(body.variableName)))
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
