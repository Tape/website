---
date: 2023-06-10
title: Developing With Docker
---

Docker is an incredibly useful tool that can greatly simplify the steps it takes to onboard more developers to your
application development environment. I'll go over simple `docker-compose` files you can use to spin up real services for
local development with only one thing to install: Docker!

---

## Install Docker

Simply visit the [Docker](https://www.docker.com) website and download the Docker Desktop installer for your platform
and architecture. Make sure to get the Apple Chip variant if you are running on the new Apple Silicon laptops that have
been in production since 2020.

Congratulations, you have taken the only step necessary to get started outside your preferred development tools!

## Docker Compose Example

Next you'll want to set up a `docker-compose.yml` file within your project that contains definitions for services you're
interested in using in your projects. I end up using [postgres](https://hub.docker.com/_/postgres) in the majority of my
projects. In some cases I might also find myself also using [redis](https://hub.docker.com/_/redis) if I want performant
session management. Let's take a look at how we can set both of those up for use in local development.

Let's start with a relatively bare example and build up to something usable.

```yaml
services:
  postgresql:
    image: postgres
  redis:
    image: redis
```

When `docker-compose up` is run in the same directory as this file, a service group will be spun up in Docker with two
containers, one for postgres and one for redis using the `latest` tag. A general practice in many applications is to
lock to a specific major version of a service and upgrade as necessary. Let's see what changes are necessary to lock to
postgres 15 and redis 7.

```yaml
services:
  postgresql:
    image: postgres // [!code --]
    image: postgres:15 // [!code ++]
  redis:
    image: redis // [!code --]
    image: redis:7 // [!code ++]
```

One other thing to note is that most major images provide `alpine` images which are incredibly small and lightweight.
Let's also use those variants.

```yaml
services:
  postgresql:
    image: postgres:15 // [!code --]
    image: postgres:15-alpine // [!code ++]
  redis:
    image: redis:7 // [!code --]
    image: redis:7-alpine // [!code ++]
```

If you're ever in doubt if an image has an `alpine` variant, look in Docker Hub and search in the tags tab for the image
and see if you can find it.

These services running by themselves are also fairly useless. They're self-contained sandboxes by default with no way
for your host machine to access the services running within. This is where port forwarding comes in. Let's forward the
default ports for postgres and redis to our host machine.

```yaml
services:
  postgresql:
    image: postgres:15-alpine
    ports: // [!code ++]
      - 5432:5432 // [!code ++]
  redis:
    image: redis:7-alpine
    ports: // [!code ++]
      - 6379:6379 // [!code ++]
```

Now when we boot up our application we can actually communicate with the services. Each service also may have its own
set of configuration that allows you to tweak behavior to your liking. Using the postgres container as an example, you
can configure the main account's username and password, as well as a default database to be created. Here's an example
of how to do so.

```yaml
services:
  postgresql:
    image: postgres:15-alpine
    environment: // [!code ++]
      - POSTGRES_USER=postgres // [!code ++]
      - POSTGRES_PASSWORD=postgres // [!code ++]
      - POSTGRES_DB=mydb // [!code ++]
    ports:
      - 5432:5432
  redis:
    image: redis:7-alpine
    ports:
      - 6379:6379
```

Every service is different, so be sure to check their readme or instructions on their Docker Hub page.

## Conclusion

While this was a fairly short blog, I want to emphasize it doesn't take much effort to make your overall development
experience better. As demonstrated a single command can be run to get true instances of postgres and redis up and
running with basically no installation. Docker is a powerful tool that can be overwhelming in its configurability, but
small subset of those parameters can be used to make a local environment with ease.
