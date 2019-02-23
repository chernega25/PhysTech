import scalaj.http.Http
import org.json4s._
import org.json4s.jackson.JsonMethods._

object Test {
  def p(s: String): String = {
    parse(s) match {
      case JObject(List(("text", JString(x)))) => x
      case _ => "None"
    }
  }

  def main(args: Array[String]): Unit = {
    println(p(Http("http://localhost:8080/Nikita").asString.body))
  }
}
