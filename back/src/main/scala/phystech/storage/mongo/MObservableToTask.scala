package phystech.storage.mongo

import monix.eval.Task
import org.mongodb.scala.{Observable => MObservable}

object MObservableToTask {
  def apply[T](obs: MObservable[T]): Task[Seq[T]] = {
    Task.deferFuture(obs.toFuture())
  }

  implicit class MObservableOps[T](val obs: MObservable[T]) extends AnyVal {
    def asTask = apply(obs)
  }
}
