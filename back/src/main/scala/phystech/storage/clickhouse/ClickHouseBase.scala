package phystech.storage.clickhouse

import akka.actor.ActorSystem
import akka.stream.Materializer
import com.crobox.clickhouse.ClickhouseClient
import com.typesafe.config.Config
import monix.eval.Task
import monix.reactive.Observable
import phystech.storage.clickhouse.AkkaStreamToObservable._

object ClickHouseBase {
  def init(config: Config, dbName: String) = new ClickhouseClient(config, dbName)

  def read(req: String)(implicit client: ClickhouseClient, mat: Materializer): Observable[String] = {
    client.source(req).asObservable
  }

  def write(req: String)(implicit client: ClickhouseClient, mat: Materializer): Task[String] = {
    Task.deferFuture(client.execute(req))
  }
}
