package phystech.storage.mongo

import org.mongodb.scala.{MongoClient, MongoDatabase}

object MongoConnection {
  def apply(address: String, dbName: String): MongoDatabase = {
    val client = MongoClient(address)
    client.getDatabase(dbName)
  }
}
