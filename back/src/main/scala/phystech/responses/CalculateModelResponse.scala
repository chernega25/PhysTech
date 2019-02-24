package phystech.responses

final case class CalculateModelResponse(result: Double, missingFields: Seq[String])
