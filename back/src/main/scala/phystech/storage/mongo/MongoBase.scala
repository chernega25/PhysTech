package phystech.storage.mongo

import monix.eval.Task
import org.bson.codecs.configuration.CodecRegistries._
import org.mongodb.scala.bson.codecs.DEFAULT_CODEC_REGISTRY
import org.mongodb.scala.{MongoClient, MongoCollection, MongoDatabase}
import org.mongodb.scala.bson.codecs.Macros._
import org.mongodb.scala.model.Filters.equal
import phystech.data.{Model, ModelVariable, Variable}
import phystech.storage.mongo.mongoSyntax._

class MongoBase(url: String, name: String) {

    private val codecRegistry =
      fromRegistries(
        fromProviders(
          classOf[ModelVariable],
          classOf[Model],
          classOf[Variable]
        ),
        DEFAULT_CODEC_REGISTRY
      )
    private val db = MongoClient(url).getDatabase(name).withCodecRegistry(codecRegistry)
    private val modelCollection: MongoCollection[Model] = db.getCollection("models")

    def createModel(model: Model): Task[Unit] = {
      modelCollection.insertOne(model).asTask.flatMap(_ => Task.unit)
    }

    def getAllModels: Task[Seq[Model]] = {
      modelCollection.find().asTask
    }

    def getModel(id: String): Task[Model] = {
      modelCollection.find(equal("modelId", id)).asTask.map {
        case Seq() => throw new Exception("Model not found")
        case Seq(model) => model
        case _ => throw new Exception(s"Multiple models with id `$id`")
      }
    }

    def countFamily(parentId: String): Task[Long] = {
      modelCollection.countDocuments(equal("parentModelId", parentId)).asTask.map{
        case Seq(size) => size
        case _ => throw new Exception("Something has gone wrong with mongo. Again")
      }
    }
}
