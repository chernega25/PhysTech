package phystech.storage.mongo

case class MongoWrapper[T](_id: String, content: T)

object MongoWrapper {
  def of[T](item: T, mkId: T => String): MongoWrapper[T] = MongoWrapper(mkId(item), item)

  implicit class AsMongoWrapper[T](val item: T) extends AnyVal {
    def asMongo(mkId: T => String): MongoWrapper[T] = of(item, mkId)
  }
}
