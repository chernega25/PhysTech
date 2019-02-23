package phystech.storage.clickhouse

import java.util.UUID

import akka.actor.ActorSystem
import akka.stream.ActorMaterializer
import com.crobox.clickhouse.ClickhouseClient
import com.typesafe.config.ConfigFactory
import monix.eval.Task
import monix.execution.Scheduler.Implicits.global
import phystech.data.{Request, RequestVariable}
import phystech.storage.clickhouse.AkkaStreamToObservable._

import scala.concurrent.Await
import scala.concurrent.duration.Duration

object ClickHouseTest extends App{

  implicit val system = ActorSystem("phystech")
  implicit val materializer = ActorMaterializer()
  val config = ConfigFactory.load("clickhouse.conf")
  val dbName = "phystech"
  implicit val client = ClickHouseBase.init(config, dbName)

  val id = UUID.randomUUID()

  val s = id + "\t0.42\tmy_model\t2016-06-15 23:00:00"
  val req = Request.fromString(s)

  val selectAllReq: Task[List[String]] = for {
    _ <- ClickHouseBase.write(req.toInsertQuery)
    res <- ClickHouseBase.read("select * from requests").toListL
  } yield res

  val selectAllVar: Task[List[String]] =
    for {
      _ <- ClickHouseBase.write(RequestVariable(id, "variable", 0.42).toInsertQuery)
      res <- ClickHouseBase.read("select * from request_variables").toListL
    } yield res


  println(Await.result(selectAllReq.runToFuture, Duration.Inf))
  println(Await.result(selectAllVar.runToFuture, Duration.Inf))

  Await.result(system.terminate(), Duration.Inf)
}
