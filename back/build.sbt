name := "phystech-back"

version := "0.1"

scalaVersion := "2.12.8"

enablePlugins(JavaAppPackaging)

scalacOptions += "-Ypartial-unification"


libraryDependencies ++= Seq(
  "com.github.finagle" %% "finchx-core" % "0.27.0", 
  "com.github.finagle" %% "finchx-circe" % "0.27.0", 
  "io.monix" %% "monix" % "3.0.0-RC2",
  "io.circe" % "circe-generic_2.12" % "0.11.1",
  "org.mongodb.scala" %% "mongo-scala-driver" % "2.6.0",
  "com.crobox.clickhouse" %% "client" % "0.8.5",
  "org.typelevel" %% "cats-core" % "1.6.0",
  "ch.qos.logback" % "logback-classic" % "1.1.3" % Runtime
)
