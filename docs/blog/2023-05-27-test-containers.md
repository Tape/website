---
date: 2023-05-27
title: Test Containers
---

Test containers are a valuable tool that integrate with many frameworks that allow you to perform tests against live
services. Check out this blog for a rundown of how they can be used to improve the quality of your code and provide a
robust mechanism to verify your services.

---

## What Are Test Containers?

Test containers are basically minimal docker containers that are spun up by a parent process for use in integration and
functional testing. Most of the time professionally I use test containers with Java, but there are integrations
available for most popular languages. For this blog we'll be doing an example with Java, Gradle, and JUnit. I would like
to add though that the core concepts should port nicely to other languages.


## Java Example

For our example, let's use the mockserver test container to imitate a REST service. This is an incredibly helpful tool
to allow validating logic based on response codes, parse errors, or any other thing that needs to be tested in a service
to service contract.

### Preface

I want to note that it's probably worth breaking these tests into a separate source set than the default `test` that is
provided with the Gradle `java` plugin. These tests are worth running in pipelines and on occasion locally, but the wait
can be painful for typical development as the codebase grows.

### Gradle Setup

First step we need to import our new testing dependencies.

```groovy
dependencies {
  // Base test containers library
  testImplementation "org.testcontainers:testcontainers"
  // Test container for mockserver
  testImplementation "org.testcontainers:mockserver"
  // Client library for communicating with mockserver
  testImplementation "org.mock-server:mockserver-client-java"
}
```

### Integration Test Base Class

A highly recommended step is to create a base class for use with integration tests.

```java
public class IntegrationTest {
  // Create the mock server container
  protected static MockServerContainer MOCK_SERVER = new MockServerContainer(
    DockerImageName.parse("mockserver/mockserver")
      // This will synchronize the client version and docker tag
      .withTag(MockServerClient.class.getPackage().getImplementationVersion())
  );

  static {
    // Start the mock server
    MOCK_SERVER.start();
  }

  protected final MockServerClient mockServerClient;
  protected final String mockServerHost;

  public IntegrationTest() {
    // Create an instance of the mock server client for tests to use
    mockServerClient = new MockServerClient(
      MOCK_SERVER.getHost(),
      MOCK_SERVER.getServerPort());

    // This value should be used in place of the "real" url to the service
    mockServerHost = String.format(
      "http://%s:%d",
      MOCK_SERVER.getHost(),
      MOCK_SERVER.getServerPort());
  }
}
```

Things to note here:
* Declaring your test containers as `static` helps significantly with runtime as only one instance will be shared
* The caveat to the above is that you need to be good about using the client `reset` after each test since you will use
  a shared container between test classes

### Test Class Example

Let's now see an example of a class that inherits from the base class and leverages the mock server.

```java
class RestClientIntegrationTest extends IntegrationTest {
  // Create our test subject in whatever manner
  private final RestClient restClient = new RestClient();

  @Test
  public void requestObjectAsync_should_handleValidResponse() {
    mockServerClient
      // The request that the mock server should listen to (GET by default)
      .when(
        request("/test")
      )
      // The response to provide when the above conditions are met
      .respond(
        response()
          .withContentType(MediaType.APPLICATION_JSON)
          .withBody("{ \"key\": \"key\", \"value\": \"value\" }")
      );

    // Creates a GET request to the path /test
    final var entity = RequestEntity.get(URI.create(mockServerHost + "/test"));
    // Execute the call which should hit the mock server and get back our mocked response
    final var response = restClient.requestObjectAsync(entity, TestPayload.class).join();

    // Assert on the payload
    assertThat(response.key).isEqualTo("key");
    assertThat(response.value).isEqualTo("value");
  }
}
```

Simple right? Here's an example of a method you can add to each test class or the base class to reset the mock server
after each test case. In the case of the base class, it's nice that this method can help prevent mistakes with tests
interfering with each other implicitly. however it can also prove to be one of those magical processes that is not clear
it's even occurring.

```java
@AfterEach
private void tearDown() {
  mockServerClient.reset();
}
```

## Advantages

* Reproducible, robust tests that hit actual services and don't need a ton of mocks.
* Plays nicely with GitHub actions and most other docker based CI/CD tools.
* Rich ecosystem for many popular services.
* Integrates directly into your testing framework.


## Disadvantages

* Depending on the services that you need, you may find yourself with tests that are "slow" due to the container
  overhead.
* ARM support is still fairly limited for Apple Silicon.
* Slower on Windows due to the limitations of it not being a Unix system. 
