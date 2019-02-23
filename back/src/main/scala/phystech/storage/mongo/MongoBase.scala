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
  private val variableCollection: MongoCollection[Variable] = db.getCollection("variables")

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

  def getModelFamily(parentId: String): Task[Seq[Model]] = {
    modelCollection.find(equal("parentModelId", parentId)).asTask
  }

  def createVariable(variable: Variable): Task[Unit] = {
    for {
      variables <- variableCollection.find(equal("variableName", variable.variableName)).asTask
      _         <- variableCollection.insertOne(variable).asTask
    } yield if (variables.nonEmpty) throw new Exception("Variable already exists")
  }

  def getAllVariables: Task[Seq[Variable]] = {
    variableCollection.find().asTask
  }
}
