//package phystech.storage.clickhouse
//
//import java.time.LocalDateTime
//import java.util.UUID
//
//import akka.actor.ActorSystem
//import akka.stream.ActorMaterializer
//import com.typesafe.config.ConfigFactory
//import monix.eval.Task
//import monix.execution.Scheduler.Implicits.global
//import phystech.data.{Request, RequestVariable}
//
//import scala.concurrent.Await
//import scala.concurrent.duration.Duration
//
//object ClickHouseTest extends App{
//
//  implicit val system = ActorSystem("phystech")
//  implicit val materializer = ActorMaterializer()
//  val config = ConfigFactory.load("clickhouse.conf")
//  val dbName = "phystech"
//  implicit val client = new ClickHouseBase(config, dbName)
//
//  val id = UUID.randomUUID().toString
//
//  val req = Request(id, 4.0, id, id, LocalDateTime.now())
//
//  val selectAllReq: Task[List[String]] = for {
//    _ <- client.write(req.toInsertQuery)
//    res <- client.read("select * from requests").toListL
//  } yield res
//
//  val selectAllVar: Task[List[String]] =
//    for {
//      _ <- client.write(RequestVariable(id, "variable", 0.42).toInsertQuery)
//      res <- client.read("select * from requestVariables").toListL
//    } yield res
//
//
//  println(Await.result(selectAllReq.runToFuture, Duration.Inf))
//  println(Await.result(selectAllVar.runToFuture, Duration.Inf))
//
//  Await.result(system.terminate(), Duration.Inf)
//}
