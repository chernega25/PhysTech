package phystech.services

import java.nio.charset.Charset

import akka.stream.Materializer
import com.crobox.clickhouse.ClickhouseClient
import com.twitter.io.Buf
import io.finch.Decode.Dispatchable
import io.finch.{BadRequest, Endpoint, Ok, _}
import monix.eval.Task
import monix.execution.Scheduler
import phystech.calculate.CalculateModel
import phystech.data.{Model, Request}
import phystech.storage.clickhouse.ClickHouseBase
import phystech.storage.mongo.MongoBase
import shapeless.HList

class TestingService(implicit scheduler: Scheduler,
                     mongo: MongoBase,
                     mat: Materializer,
                     clickHouse: ClickHouseBase)
    extends Endpoint.Module[Task] {

  private def calcCsv(model: Model, csv: String): String = {
    val eps: Double = 10e-3
    val lines = csv.replaceAll(" ", "").split("\n")
    val names = lines(0).split(",")
    val valueLines = lines.drop(1)
    val modelValues = valueLines
      .map(_.split(","))
      .map(v => names.zip(v.map(_.toDouble)).toMap)
      .map(v => {
        val res = v("result")
        val modelRes = CalculateModel(model, v)
        (modelRes, math.abs(res - modelRes) < eps)
      })

    (names :+ "modelResult" :+ "converged").mkString(",") + "\n" + valueLines
      .zip(modelValues)
      .map(p => s"${p._1},${p._2._1},${p._2._2}")
      .mkString("\n")
  }

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
    post(
      "testFirstStage" :: param[String]("modelId") :: body[String,
                                                           Application.Csv]) {
      (id: String, body: String) =>
        mongo
          .getModel(id)
          .map(
            m =>
              Ok(calcCsv(m, body))
                .withHeader("Content-Disposition",
                            "form-data; name=test; filename=test.csv")
                .withHeader("Content-Type", "text/csv"))
    }

  final def testSecondStage: Endpoint[Task, Unit] =
    post("testSecondStage" :: param[String]("modelId")) { id: String =>
      {
        for {
          model <- mongo.getModel(id)
          strings <- clickHouse
            .read(
              s"select * from requests where modelId = ${model.modelId} limit 100")
            .toListL
          requests = strings.map(Request.fromString)
        } yield Ok(())
      }
    }

  final def combine[ES <: HList, CTS <: HList](bootstrap: Bootstrap[ES, CTS]) =
    bootstrap
      .serve[Text.Plain](
        (testFirstStage :+: testSecondStage) handle {
          case e: Exception =>
            println(s"Error: $e")
            BadRequest(e)
        }
      )
}
