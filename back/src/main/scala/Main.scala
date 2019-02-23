import monix.execution.Scheduler.Implicits.global
import com.twitter.finagle.Http
import com.twitter.util.Await
import io.circe.{Encoder, Json}
import io.finch._
import monix.eval.Task
import phystech.services.ModelsService
import io.circe.generic.auto._
import io.finch.circe._
import phystech.storage.mongo.MongoBase

object Main extends App with Endpoint.Module[Task] {
  implicit val encodeException: Encoder[Exception] = Encoder.instance({
    case e: Exception => Json.obj("message" -> Json.fromString(e.getMessage))
  })

  implicit val mongo = new MongoBase("mongodb://phystech:phystech@209.250.236.189", "phystech")
  val modelsService = new ModelsService().combine(Bootstrap)

  Await.ready(Http.server.serve(":8080", modelsService.toService))
}