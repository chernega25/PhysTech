package phystech.services

import io.finch.Endpoint
import monix.eval.Task
import monix.execution.Scheduler
import io.finch.{BadRequest, Ok}
import io.finch._
import com.twitter.io.Buf
import com.twitter.concurrent.AsyncStream

class TestingService(implicit scheduler: Scheduler) extends Endpoint.Module[Task] {
  final def testFirstStage: Endpoint[Task, AsyncStream[Buf]] = ???
}
