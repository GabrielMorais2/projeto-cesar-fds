FROM maven:3.9.4-amazoncorretto-17 as build
WORKDIR /app

COPY src /app/src
COPY pom.xml /app
COPY .mvn /app/.mvn
COPY mvnw /app/mvnw

RUN mvn clean package -DskipTests

FROM openjdk:17

WORKDIR /app

COPY --from=build ./app/target/*.jar ./app.jar

ENTRYPOINT java -jar app.jar