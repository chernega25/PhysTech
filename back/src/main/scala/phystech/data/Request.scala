package phystech.data

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.UUID

case class Request(id: UUID,
                   response: Double,
                   modelName: String,
                   date: LocalDateTime) {
  import Request.pattern
  override def toString: String =
    "'" + id + "'" + ", " + response + ", '" + modelName + "', '" + date.format(
      pattern) + "'"

  def toInsertQuery = "insert into requests values (" + toString + ")"
}

object Request {
  val pattern: DateTimeFormatter =
    DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")

  def fromString(str: String): Request = {
    val arr = str.split("\\s+")
    Request(UUID.fromString(arr(0)),
            arr(1).toDouble,
            arr(2),
            LocalDateTime.parse(arr(3) + " " + arr(4), pattern))
  }
}
