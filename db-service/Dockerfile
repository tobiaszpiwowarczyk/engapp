FROM openjdk:8
ADD /build/libs/db-service.jar db-service.jar
EXPOSE 8001
ENTRYPOINT ["java", "-jar", "db-service.jar"]