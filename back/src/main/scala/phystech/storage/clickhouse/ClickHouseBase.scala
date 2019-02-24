package phystech.storage.clickhouse

import akka.stream.Materializer
import com.crobox.clickhouse.ClickhouseClient
import com.typesafe.config.Config
import monix.eval.Task
import monix.reactive.Observable
import phystech.storage.clickhouse.AkkaStreamToObservable._

class ClickHouseBase(config: Config, dbName: String)(implicit mat: Materializer) {
  private val client = new ClickhouseClient(config, dbName)

  def read(req: String): Observable[String] = {
    client.source(req).asObservable
  }

  def write(req: String): Task[String] = {
    Task.deferFuture(client.execute(req))
  }
}
