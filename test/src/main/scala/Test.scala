import scalaj.http._
import org.json4s._
import org.json4s.jackson.JsonMethods._

import scala.io.StdIn._
import scala.util.Random

object Test {
  val URL = "http:/95.179.163.167:8080"

  def p(s: String): String = {
    parse(s) match {
      case JObject(List(("text", JString(x)))) => x
      case _ => "None"
    }
  }

  def variableValues(variables: List[String]): List[(String, Int)] = {
    variables.map((_, Random.nextInt() % 50))
  }

  def getResult(variablesValues: List[(String, Int)], models: List[String]): List[String] = {
    models
  }

  def main(args: Array[String]): Unit = {
    while (true) {
      val s = readLine()

      val result = Http(s"$URL/changeVariable")
        .postData(s"""{"variableName": "email_length","variableDescription": "$s"}""")
        .header("Content-Type", "application/json")
        .option(HttpOptions.readTimeout(10000)).asString

      println(Http(s"$URL/getListOfVariables").asString.body)
    }
  }
}
