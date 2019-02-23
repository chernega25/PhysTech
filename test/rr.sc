import scalaj.http.Http

//println(Http("http://localhost:8080/Nikita").asString)

Http("http://foo.com/search").param("q", "monkeys")