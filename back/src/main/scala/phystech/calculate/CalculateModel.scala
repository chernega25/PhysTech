package phystech.calculate

import phystech.data.Model

object CalculateModel {
  def apply(model: Model, values: Map[String, Double]): Double = {
    val logit = model.variableList
      .map(v => values.getOrElse(v.variableName, v.defaultValue) * v.coefficient)
      .fold(0.0)((a, b) => a + b)
    1.0 / (1.0 + math.exp(-logit))
  }
}
