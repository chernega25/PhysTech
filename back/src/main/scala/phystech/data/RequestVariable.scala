package phystech.data

import java.util.UUID

case class RequestVariable(requestId: UUID, variableName: String, variableValue: Double) {
  override def toString: String = "'" + requestId + "'" + ", '" + variableName + "', " + variableValue

  def toInsertQuery = "insert into request_variables values (" + toString + ")"
}

object RequestVariable {
  def fromString(str: String): RequestVariable = {
    val arr = str.split("\\s+")
    RequestVariable(UUID.fromString(arr(0)), arr(1), arr(2).toDouble)
  }
}