---
date: 2023-10-07
title: Spring Async Quickstart
---

Spring async is a simple yet powerful tool that allows you to divide up bite sized chunks of work to be processed in
parallel. Whether it be a heavy computation or simply just trying to perform multiple requests to external services, the
possibilities are pretty much endless.

---

## Getting Started

Spring async is slightly unique in that it needs to be enabled. This process is simple.

This can be done by annotating your application:

```java
@EnableAsync // [!code ++]
@SpringBootApplication
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

Or a configuration class:

```java
@Configuration
@EnableAsync // [!code ++]
public class MyConfiguration {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

## Writing Async Code

Async code is implemented by adding the `@Async` annotation to a method and by wrapping the return type of the method
with a `Future` type. I prefer to use `CompleteableFuture` as it provides much more utility over the base class. Let's
take a look at a synchronous method and make it async.

```java
public void countToOneBillion() {
    for (int i = 0; i < 1_000_000_000; i++) {
        // Cool inner loop stuff
    }
}
```

I opted for a void function here to demonstrate when you don't need a return value; however, the same logic can be
applied when you DO need a return value. Now, let's make this async. Note: this method MUST be in a Spring annotated
component and be defined as non-private, or it will not work.

```java
@Async // [!code ++]
public void countToOneBillion() { // [!code --]
public CompleteableFuture<Void> countToOneBillion() { // [!code ++]
    for (int i = 0; i < 1_000_000_000; i++) {
        // Cool inner loop stuff
    }
    return CompleteableFuture.completedFuture(null); // [!code ++]
}
```

The main way to think about how to implement an async method is to act as if it's being called synchronously and provide
the asynchronous return type, and Spring magic will fill in the gaps.

## Using Async Code

When using async code, your main thread is responsible for waiting on the completion of your async code. In the case of
Spring boot, your controller logic is executed as a single thread which can call async methods. You have two options to
wait for the async code to finish: `get()` or `join()`.

### get()

`get()` has checked exceptions that must be handled or thrown.

```java
@Service
public class MyService {
    private final CountingService countingService;
    
    public MyService(CountingService countingService) {
        this.countingService = countingService;
    }
    
    public void doStuff() {
        final var future = countingService.countToOneBillion();
        try {
            future.get();
        } catch (ExecutionException e) {
            // Thrown when an exception is thrown by the task
        } catch (InterruptedException e) {
            // Thrown when the async task is interrupted
            Thread.currentThread().interrupt();
        }
    }
}
```

### join()

`join()` uses runtime exceptions, so they do not need to be caught unless you would like to handle them.

```java
@Service
public class MyService {
    private final CountingService countingService;
    
    public MyService(CountingService countingService) {
        this.countingService = countingService;
    }
    
    public void doStuff() {
        final var future = countingService.countToOneBillion();
        future.join();
    }
}
```

## Conclusion

Spring async is definitely a useful tool to have handy when performance is a concern, and is handy in that there is
little management required by the developer to handle job executors as the Spring service will automatically handle it.

Happy coding!
