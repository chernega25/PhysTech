package phystech.requests

import phystech.data.CalculationVariable

final case class CalculateModelRequest(parentModelId: String, variableList: Seq[CalculationVariable])