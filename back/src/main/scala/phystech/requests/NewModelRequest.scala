package phystech.requests

import phystech.data.ModelVariable

final case class NewModelRequest(modelName: String, variableList: List[ModelVariable])
