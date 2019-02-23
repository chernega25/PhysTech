name := "back"

version := "0.1"

scalaVersion := "2.12.8"

libraryDependencies ++= Seq(
  "com.github.finagle" %% "finchx-core" % "0.27.0", 
  "com.github.finagle" %% "finchx-circe" % "0.27.0", 
  "io.monix" %% "monix" % "3.0.0-RC2",
  "io.circe" % "circe-generic_2.12" % "0.11.1",
)
