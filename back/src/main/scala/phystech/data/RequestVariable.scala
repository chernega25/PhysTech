package phystech.data


case class RequestVariable(requestId: String, variableName: String, variableValue: Double) {
  override def toString: String = s"'$requestId','$variableName',$variableValue"

  def toInsertQuery = "insert into requestVariables values (" + toString + ")"
}

object RequestVariable {
  def fromString(str: String): RequestVariable = {
    val arr = str.split("\\s+")
    RequestVariable(arr(0), arr(1), arr(2).toDouble)
  }
}