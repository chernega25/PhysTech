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
import phystech.data.{Model, Request, RequestVariable}
import phystech.storage.clickhouse.ClickHouseBase
import phystech.storage.mongo.MongoBase
import shapeless.HList

class TestingService(implicit scheduler: Scheduler,
                     mongo: MongoBase,
                     mat: Materializer,
                     clickHouse: ClickHouseBase)
    extends Endpoint.Module[Task] {

  private def calcFromString(model: Model, csv: String): String = {
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

  private def calcFromProduct(
      model: Model,
      responses: List[Double],
      variables: List[List[RequestVariable]]): String = {
    val names = (model.variableList.map(_.variableName) :+ "response" :+ "modelResult")
      .mkString(",") + "\n"
    val rows = variables.zip(responses)
      .map(pair => {
        val varMap = pair._1.map(v => (v.variableName, v.variableValue)).toMap
        val varValues = model.variableList.map(v =>
          varMap.getOrElse(v.variableName, v.defaultValue))
        val calcRes = CalculateModel(model, varMap)
        (varValues :+ pair._2 :+ calcRes).mkString(",")
      })
      .mkString("\n")
    names + rows
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
              Ok(calcFromString(m, body))
                .withHeader("Content-Disposition",
                            "form-data; name=test; filename=test.csv")
                .withHeader("Content-Type", "text/csv"))
    }

  final def testSecondStage: Endpoint[Task, String] =
    post("testSecondStage" :: param[String]("modelId")) { id: String =>
      {
        for {
          model <- mongo.getModel(id)
          strings <- clickHouse
            .read(
              s"select * from requests where parentId = '${model.parentModelId}' limit 100")
          requests = strings.map(Request.fromString)
          tasks = requests.map(
            r =>
              clickHouse
                .read(
                  s"select * from requestVariables where requestId = '${r.id}'"))
          batches = tasks.sliding(3, 3).map(b => Task.gather(b))
          rows <- Task.sequence(batches).map(_.flatten.toList)
          variables = rows.map(p => p.map(RequestVariable.fromString))
        } yield
          Ok(calcFromProduct(model, requests.map(_.response), variables))
            .withHeader("Content-Disposition",
                        "form-data; name=test; filename=test.csv")
            .withHeader("Content-Type", "text/csv")
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
