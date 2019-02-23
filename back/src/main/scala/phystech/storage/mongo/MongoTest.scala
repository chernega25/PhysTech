package phystech.storage.mongo


import monix.execution.Scheduler.Implicits.global
import org.mongodb.scala.MongoCollection
import phystech.data.{Model, ModelVariable, Variable}
import phystech.storage.mongo.MObservableToTask._
import org.mongodb.scala.model.Filters._

import scala.concurrent.Await
import scala.concurrent.duration.Duration

object MongoTest extends App {
  val db = MongoBase.init()
  val modelCollection: MongoCollection[Model] = db.getCollection("models")
  val variableCollection: MongoCollection[Variable] = db.getCollection("variables")

//  val model = Model("id1", "id1", "model", 1, 0, List(ModelVariable("name", 0.1, 0.1)))

  val task = modelCollection.find(equal("modelId", "id1")).asTask
  val fut = task.runToFuture
  println(Await.result(fut, Duration.Inf))
}
