# Generator-Spring-Boot
A Yeoman generator for generating a Spring-Boot Kafka Consumer

## Features

* Quick Spring-Boot Project setup
* JUnit
* Localstack configuration
* ApplicationName selection
* ContextRoot selection
* ProjectPath selection
* Kafka Topic Selection


This will generate:

* Service
* Spring Kafka Consumer
* Unit and Integration Tests for the consumer

## Local Development Setup

```
> git clone https://github.com/DLaMott/generator-spring-boot-kafa-consumer.git
> cd generator-spring-boot-kafka-consumer
> npm install -g yo
> npm install 
> npm link
> yo generator-spring-boot-kafka-consumer
```

## Don't want the code?

```
> npm install -g yo
> npm install -g generator-spring-boot-kafka-consumer
> yo generator-spring-boot-kafka-consumer
```

## Note
* Tested using JDK 17