package phystech.responses

import phystech.data.Model

final case class ModelSummary(id: String, parentId: String, modelName: String, version: Long)

object ModelSummary {
  def fromModel(model: Model): ModelSummary =
    ModelSummary(model.modelId, model.parentModelId, model.modelName, model.version)
}