package phystech.services

import java.nio.charset.Charset

import io.finch.Endpoint
import monix.eval.Task
import monix.execution.Scheduler
import io.finch.{BadRequest, Ok}
import io.finch._
import com.twitter.io.Buf
import com.twitter.concurrent.AsyncStream
import io.finch.{BadRequest, Ok}
import io.finch._
import monix.eval.Task
import monix.execution.Scheduler
import phystech.responses.{
  ChangeModelResponse,
  ModelSummary,
  NewModelResponse,
  VariableNameWrapper
}
import io.circe.generic.auto._
import io.finch.Decode.Dispatchable
import io.finch.circe._
import phystech.data.{Model, ModelVariable, Variable}
import phystech.requests.{ChangeModelRequest, NewModelRequest}
import phystech.storage.mongo.MongoBase
import shapeless.HList

class TestingService(implicit scheduler: Scheduler)
    extends Endpoint.Module[Task] {

  implicit val csvDecoder: Dispatchable[String, Application.Csv] =
    (ct: String, b: Buf, cs: Charset) => {
      val arr: Array[Byte] = Array.fill(b.length)(0)
      b.write(arr, 0)
      Right(
        arr
          .map(_.toChar)
          .mkString("")
          .split("\n")
          .drop(4)
          .dropRight(2)
          .mkString("\n"))
    }

  final def testFirstStage: Endpoint[Task, String] =
    post("testFirstStage" :: body[String, Application.Csv]) {
      body: String =>
        println(body)
        Ok(body)
          .withHeader("Content-Disposition",
                      "form-data; name=test; filename=test.csv")
          .withHeader("Content-Type", "text/csv")
    }

  final def combine[ES <: HList, CTS <: HList](bootstrap: Bootstrap[ES, CTS]) =
    Bootstrap
      .serve[Text.Plain](
        (testFirstStage) handle {
          case e: Exception =>
            println(s"Error: $e")
            BadRequest(e)
        }
      )
}
