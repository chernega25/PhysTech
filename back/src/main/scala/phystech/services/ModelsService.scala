package phystech.services

import com.twitter.finagle.Service
import com.twitter.finagle.http.{Request, Response}
import io.finch.{BadRequest, Ok}
import io.finch._
import monix.eval.Task
import monix.execution.Scheduler
import phystech.responses.{ChangeModelResponse, ModelSummary, NewModelResponse, NewVariableResponse}
import io.circe.generic.auto._
import io.finch.circe._
import phystech.data.{Model, ModelVariable, Variable}
import phystech.requests.{ChangeModelRequest, GetModelRequest, NewModelRequest}

class ModelsService(implicit scheduler: Scheduler) extends Endpoint.Module[Task] {

  final def getListOfModels: Endpoint[Task, List[ModelSummary]] =
    get("getListOfModels") { () =>
      Ok(List(ModelSummary("1", "m019", 3, 2), ModelSummary("1", "m019cl", 5, 5)))
    }

  final def getListOfVariables: Endpoint[Task, List[Variable]] =
    get("getListOfVariables") { () =>
      Ok(List(Variable("age", "Возраст человека"), Variable("email_length", "Длина эл. почты")))
    }

  final def getModel: Endpoint[Task, List[Model]] =
    get("getModel" :: jsonBody[GetModelRequest]) { body: GetModelRequest =>
      println(s"getModel: $body")
      Ok(List(Model("431", "123", "m019", 2, 3, List(ModelVariable("age", -17.43, 30), ModelVariable("email_length", 4.647, 15)))))
    }

  final def newModel: Endpoint[Task, NewModelResponse] =
    post("newModel" :: jsonBody[NewModelRequest]) { body: NewModelRequest =>
      println(s"newModel: $body")
      Ok(NewModelResponse("431"))
    }

  final def newVariable: Endpoint[Task, NewVariableResponse] =
    post("newVariable" :: jsonBody[Variable]) { body: Variable =>
      println(s"newVariable: $body")
      Ok(NewVariableResponse(body.variableName))
    }

  final def changeModel: Endpoint[Task, ChangeModelResponse] =
    post("changeModel" :: jsonBody[ChangeModelRequest]) { body: ChangeModelRequest =>
      println(s"changeModel: $body")
      Ok(ChangeModelResponse("497", "319", 4))
    }

  final def toService: Service[Request, Response] = Bootstrap
    .serve[Application.Json](getListOfModels :+: getListOfVariables :+: getModel :+: newModel :+: newVariable :+: changeModel)
    .toService
}
