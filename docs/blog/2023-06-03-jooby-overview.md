---
date: 2023-06-03
title: Jooby Overview
---

Jooby is a tiny webservice framework that provides a blazing fast, extensible platform to develop RESTful services in.
While it's easy to dismiss as a meme framework because it sits atop the TechEmpower benchmarks for Java, it's hard to
dismiss the plugins and choose-your-own implementation capabilities that help keep it small and fast.

---

## Hello, World!

The minimal configuration of Jooby is extremely simple. You must bring in the core library as well as your choice of web
server.

* Jetty (`jooby-jetty`)
* Netty (`jooby-netty`)
* Undertow (`jooby-utow` < version 3 or `jooby-undertow` >= version 3)

Below is a minimal dependencies block in the `build.gradle`:

```groovy
dependencies {
    implementation "io.jooby:jooby:${joobyVersion}"
    implementation "io.jooby:jooby-undertow:${joobyVersion}"
}
```

And a fairly minimal basic application.

```java
class Application extends Jooby {
    public static void main(String[] args) {
        Jooby.runApp(args, Application.class);
    }

    public Application() {
        get("/", ctx -> "Hello, world!");
    }
}
```

## Script API vs. MVC

The above example demonstrates the script API that is provided, but Jooby also has an MVC API that allows you to break
off larger chunks of functionality into more modular pieces. You can modify your application code to look like below:

```java
class Application extends Jooby {
    public static void main(String[] args) {
        Jooby.runApp(args, Application.class);
    }

    public Application() {
        get("/", ctx -> "Hello, world!"); // [!code --]
        mvc(new Controller()); // [!code ++]
    }
}
```

Next, implement a controller class:

```java
@Path("/")
class Controller {
    // A simple GET example
    @GET
    public String sayHello() {
        return "Hello, world!";
    }

    // A non-blocking GET example that has a path param
    @GET
    @Path("/{id}")
    public CompletableFuture<String> sayHelloNonBlocking(
            @PathParam String id
    ) {
        final var greeting = String.format("Hello, %s!", id);
        return CompletableFuture.complete(greeting);
    }
}
```

## Modules

Out of the box, Jooby doesn't really do too much. I however feel the additional control you get by being able to mix and
match parts allows you to assemble the architecture.

One particular example is out of the box Jooby has no real message encoders/decoders. Let's take a look at how simple it
is to add JSON functionality to our example application!

Our `build.gradle`:

```groovy
dependencies {
    implementation "io.jooby:jooby:${joobyVersion}"
    implementation "io.jooby:jooby-jackson:${joobyVersion}" // [!code ++]
    implementation "io.jooby:jooby-undertow:${joobyVersion}"
}
```

Our application class:

```java
class Application extends Jooby {
    public static void main(String[] args) {
        Jooby.runApp(args, Application.class);
    }

    public Application() {
        install(new JacksonModule()); // [!code ++]
        mvc(new Controller());
    }
}
```

Finally, our controller:

```java
@Path("/")
class Controller {
    // A simple GET example
    @GET
    public String sayHello() { // [!code --]
        return "Hello, world!"; // [!code --]
    public HelloResponse sayHello() { // [!code ++]
        return new HelloResponse("Hello, world!"); // [!code ++]
    }

    // A non-blocking GET example that has a path param
    @GET
    @Path("/{id}")
    public CompletableFuture<String> sayHelloNonBlocking( // [!code --]
    public CompletableFuture<HelloResponse> sayHelloNonBlocking( // [!code ++]
            @PathParam String id
    ) {
        final var greeting = String.format("Hello, %s!", id);
        return CompletableFuture.complete(greeting); // [!code --]
        return CompletableFuture.complete(new HelloResponse(greeting)); // [!code ++]
    }
// [!code ++]
    public record HelloResponse(String greeting) {}  // [!code ++]
}
```

Just like that you've now converted your plain text API to one that returns serialized JSON from Java POJO/Records!
There's plenty of other extensions that Jooby provides such as dependency injection, session management, GraphQL, and
many more.
