package phystech.storage.clickhouse

import monix.reactive.Observable
import akka._
import akka.stream._
import akka.stream.scaladsl._

object AkkaStreamToObservable {
  implicit class AkkaToMonixOps[T](val source: Source[T, NotUsed]) extends AnyVal {
    def asObservable(implicit mat: Materializer): Observable[T] = {
      val publisher = source.runWith(Sink.asPublisher[T](fanout = false))
      Observable.fromReactivePublisher(publisher)
    }
  }
}
