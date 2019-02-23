import monix.execution.Scheduler.Implicits.global
import cats.instances.int._
import com.twitter.finagle.Http
import com.twitter.util.Await
import io.finch._
import monix.eval.Task
import phystech.services.ModelsService

/**
  * A tiny Finch application that serves a single endpoint `POST /:a/b:` that divides `a` by `b`.
  *
  * Use the following sbt command to run the application.
  *
  * {{{
  *   $ sbt 'examples/runMain io.finch.div.Main'
  * }}}
  *
  * Use the following HTTPie commands to test endpoints.
  *
  * {{{
  *   $ http POST :8081/20/10
  *   $ http POST :8081/10/0
  * }}}
  */
object Main extends App with Endpoint.Module[Task] {

  val modelsService = new ModelsService()

  Await.ready(Http.server.serve(":8080", modelsService.toService))
}