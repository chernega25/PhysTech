package phystech.requests

import phystech.data.ModelVariable

final case class NewModelRequest(parentModelId: Option[String], modelName: String, variableList: List[ModelVariable])
