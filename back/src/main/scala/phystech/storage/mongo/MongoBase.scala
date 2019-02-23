package phystech.storage.mongo

import org.bson.codecs.configuration.CodecRegistries.{
  fromProviders,
  fromRegistries
}
import org.bson.codecs.configuration.CodecRegistry
import org.mongodb.scala.bson.codecs.DEFAULT_CODEC_REGISTRY
import org.mongodb.scala.{MongoClient, MongoDatabase}
import org.mongodb.scala.bson.codecs.Macros._
import phystech.data.{Model, ModelVariable, Variable}

object MongoBase {
  def apply(address: String,
            dbName: String,
            codecRegistry: CodecRegistry): MongoDatabase = {
    val client = MongoClient(address)
    client.getDatabase(dbName).withCodecRegistry(codecRegistry)
  }

  def init(url: String = "mongodb://phystech:phystech@209.250.236.189",
           dbName: String = "phystech"): MongoDatabase = {
    val codecRegistry = fromRegistries(
      fromProviders(classOf[ModelVariable], classOf[Model], classOf[Variable]),
      DEFAULT_CODEC_REGISTRY)

    MongoBase(url, dbName, codecRegistry)
  }
}
