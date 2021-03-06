package phystech.storage.mongo

import monix.eval.Task
import org.bson.codecs.configuration.CodecRegistries._
import org.mongodb.scala.bson.codecs.DEFAULT_CODEC_REGISTRY
import org.mongodb.scala.{MongoClient, MongoCollection}
import org.mongodb.scala.bson.codecs.Macros._
import org.mongodb.scala.model.Filters._
import org.mongodb.scala.model.Updates._
import phystech.data.{CurrentModel, Model, ModelVariable, Variable}
import phystech.storage.mongo.mongoSyntax._

class MongoBase(url: String, name: String) {

  private val codecRegistry =
    fromRegistries(
      fromProviders(
        classOf[ModelVariable],
        classOf[Model],
        classOf[Variable],
        classOf[CurrentModel],
      ),
      DEFAULT_CODEC_REGISTRY
    )
  private val db = MongoClient(url).getDatabase(name).withCodecRegistry(codecRegistry)

  private val modelCollection: MongoCollection[Model] = db.getCollection("models")
  private val variableCollection: MongoCollection[Variable] = db.getCollection("variables")
  private val currentModelCollection: MongoCollection[CurrentModel] = db.getCollection("currentModel")

  def createModel(model: Model): Task[Unit] = {
    for {
      sameNameModels <- modelCollection.find(equal("modelName", model.modelName)).asTask
      _              = if (sameNameModels.nonEmpty) throw new Exception("Model name exists")
      _              <- modelCollection.insertOne(model).asTask
    } yield ()
  }

  def addModelToFamily(model: Model): Task[Unit] = {
    modelCollection.insertOne(model).asTask.flatMap(_ => Task.unit)
  }

  def getAllModels: Task[Seq[Model]] = {
    modelCollection.find().asTask
  }

  def getModel(id: String): Task[Model] = {
    modelCollection.find(equal("modelId", id)).asTask.map {
      case Seq()      => throw new Exception("Model not found")
      case Seq(model) => model
      case _          => throw new Exception(s"Multiple models with id `$id`")
    }
  }

  def updateMedelStage(id: String): Task[Unit] = {
    modelCollection.updateOne(equal("modelId", id), inc("testingStage", 1)).asTask.map(_ => ())
  }

  def getModelFamily(parentId: String): Task[Seq[Model]] = {
    modelCollection.find(equal("parentModelId", parentId)).asTask
  }

  def createVariable(variable: Variable): Task[Unit] = {
    for {
      variables <- variableCollection.find(equal("variableName", variable.variableName)).asTask
      _         = if (variables.nonEmpty) throw new Exception("Variable already exists")
      _         <- variableCollection.insertOne(variable).asTask
    } yield ()
  }

  def createVariableIfMissing(variableName: String): Task[Unit] = {
    for {
      variable <- variableCollection.find(equal("variableName", variableName)).asTask
      _ <- if (variable.isEmpty) variableCollection.insertOne(Variable(variableName, "")).asTask else Task.unit
    } yield ()
  }

  def updateVariable(variable: Variable): Task[Unit] = {
    variableCollection.replaceOne(equal("variableName", variable.variableName), variable).asTask.flatMap(_ => Task.unit)
  }

  def getAllVariables: Task[Seq[Variable]] = {
    variableCollection.find().asTask
  }

  def createCurrentModel(currentModel: CurrentModel): Task[Unit] = {
    for {
      models <- currentModelCollection.find(equal("parentModelId", currentModel.parentModelId)).asTask
      _      = if (models.nonEmpty) throw new Exception("Current model already exists")
      _      <- currentModelCollection.insertOne(currentModel).asTask
    } yield ()
  }

  def getCurrentModels: Task[Seq[CurrentModel]] = {
    currentModelCollection.find().asTask
  }

  def getCurrentModel(parentModelId: String): Task[CurrentModel] = {
    currentModelCollection.find(equal("parentModelId", parentModelId)).asTask.map {
      case Seq()      => throw new Exception("Current model not found")
      case Seq(model) => model
      case _          => throw new Exception(s"Multiple current models with parentModelId `$parentModelId`")
    }
  }

  def setCurrentModel(model: Model): Task[Unit] = {
    currentModelCollection.replaceOne(
      equal("parentModelId", model.parentModelId),
      CurrentModel(model.modelId, model.parentModelId, model.modelName, model.version)
    ).asTask.flatMap(_ => Task.unit)
  }
}
