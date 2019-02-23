package phystech.data

final case class Model(
  modelId: String,
  parentModelId: String,
  modelName: String,
  version: Long,
  testingStage: Int,
  variableList: List[ModelVariable]
)
