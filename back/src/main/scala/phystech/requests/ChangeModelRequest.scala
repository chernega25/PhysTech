package phystech.requests

import phystech.data.ModelVariable

final case class ChangeModelRequest(modelId: String, modelName: String, variableList: List[ModelVariable])
