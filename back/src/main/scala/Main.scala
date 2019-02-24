import akka.actor.ActorSystem
import akka.stream.ActorMaterializer
import monix.execution.Scheduler.Implicits.global
import com.twitter.finagle.Http
import com.twitter.util.Await
import io.circe.{Encoder, Json}
import io.finch._
import monix.eval.Task
import phystech.services.{ModelsService, TestingService}
import io.circe.generic.auto._
import io.finch.circe._
import phystech.storage.mongo.MongoBase
import ch.qos.logback.classic.{Level, Logger}
import com.crobox.clickhouse.ClickhouseClient
import com.typesafe.config.ConfigFactory
import org.slf4j.LoggerFactory
import phystech.storage.clickhouse.ClickHouseBase
import phystech.storage.clickhouse.ClickHouseBase

object Main extends App with Endpoint.Module[Task] {
  val logger = LoggerFactory
    .getLogger(org.slf4j.Logger.ROOT_LOGGER_NAME)
    .asInstanceOf[Logger]
    .setLevel(Level.INFO)
  val config = ConfigFactory.load("clickhouse.conf")
  val dbName = "phystech"

  implicit val encodeException: Encoder[Exception] = Encoder.instance({
    case e: Exception => Json.obj("message" -> Json.fromString(e.getMessage))
  })

  implicit val system = ActorSystem("phystech")
  implicit val materializer = ActorMaterializer()

  implicit val mongo =
    new MongoBase("mongodb://phystech:phystech@209.250.236.189", "phystech")
  implicit val clickHouse: ClickHouseBase = new ClickHouseBase(config, dbName)
  val modelsService = new ModelsService().combine(Bootstrap)
  val testingService = new TestingService().combine(modelsService)
  Await.ready(Http.server.serve(":8080", testingService.toService))
}
