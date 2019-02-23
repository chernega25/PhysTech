package phystech.services

import com.twitter.finagle.Service
import com.twitter.finagle.http.{Request, Response}
import io.finch.{BadRequest, Ok}
import io.finch._
import monix.eval.Task
import monix.execution.Scheduler
import phystech.responses.ModelSummary
import io.circe.generic.auto._
import io.finch.circe._

class ModelsService(implicit scheduler: Scheduler) extends Endpoint.Module[Task] {

  final def getListOfModels: Endpoint[Task, List[ModelSummary]] = get("getListOfModels") { () =>
    Ok(List(ModelSummary("1", "m019", 3, 2), ModelSummary("1", "m019cl", 5, 5)))
  }

//  final def getModel: Endpoint[Task, List[Model]] = get("")

  final def toService: Service[Request, Response] = Bootstrap
    .serve[Application.Json](getListOfModels)
    .toService
}
