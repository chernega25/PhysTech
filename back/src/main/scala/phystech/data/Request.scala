package phystech.data

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.UUID

case class Request(id: String,
                   response: Double,
                   parentId: String,
                   modelId: String,
                   date: LocalDateTime) {
  import Request.pattern
  override def toString: String =
    s"'$id',$response,'$parentId','$modelId','${date.format(pattern)}'"

  def toInsertQuery = "insert into requests values (" + toString + ")"
}

object Request {
  val pattern: DateTimeFormatter =
    DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")

  def fromString(str: String): Request = {
    val arr = str.split("\\s+")
    Request(arr(0),
            arr(1).toDouble,
            arr(2),
            arr(3),
            LocalDateTime.parse(arr(4) + " " + arr(5), pattern))
  }
}
