---
date: 2023-10-14
title: Obscure Gradle Features 1
---

Most applications using Gradle can get away with utilizing the core Gradle functionality. In this blog, I will go over
how templates can be defined to allow multi-module projects to share code.

---

## Getting Started

At the root of your repository, create a folder named `buildSrc`. This is a special by-convention directory that Gradle
has which can allow you to hook in to some cool features. Let's make a generic java template we can use as a baseline
for all of our submodules.

## Reusable Java Module

In the `buildSrc` directory, create the path `src/main/groovy`, and inside that, create a `java-template.gradle` file.
Use the following sample code:

```groovy
plugins {
    id 'java'
}

tasks.withType(Test).configureEach {
    useJUnitPlatform()
}

repositories {
    mavenCentral()
}

dependencies {
    testImplementation platform("org.junit:junit-bom:5.10.0")
    testImplementation "org.junit.jupiter:junit-jupiter"
}
```

## Utilizing The Module

Utilizing the module is straightforward. Create a new gradle module under your root project (or really wherever you want
it in your project structure). Be sure to register it and add a base `build.gradle`. Now here's where the magic begins.
Register the template you created as a plugin.

```java
plugins {
    id 'java-template'
}
```

## Conclusion

And just like that, you now have a Gradle project that automatically has the Java plugin, JUnit pre-configured and
imported, and uses maven central for all dependencies.
