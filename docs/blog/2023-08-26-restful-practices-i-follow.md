---
date: 2023-08-26
title: RESTful Practices I Follow
---

In this blog I go over some RESTful practices that I follow. REST enables you to do pretty much anything you want within
the variables available, but holding yourself to a consistent standard is likely the most important piece. This blog
will outline the standards that I hold myself to when designing new APIs.

---

# Compatibility

Fields being removed can always be considered a breaking change unless the API explicitly calls out not present as a
valid option. I personally am not a huge fan of "hiding" null values, so if at all possible all removals are breaking,
but I am willing to compromise on this point.

Changed types are always breaking. The exception to this is enum, which allows for new enum values. Enum values cannot
be renamed or removed, however they can be deprecated and stop being used.

New fields are never considered breaking, however the API consumers should never be required to expect new properties to
have non-null values once introduced.

# Context Root

The context root should always begin at `v1` and may have more specific attributes depending on if there is a service
mesh or not. Ideally, the context path is always `/api/v1` and a load balancer handles the routing if there is several
APIs to route to. As breaking changes are introduced, the version increases, and this can be done per-resource.

# Resources

Resources are always plural, so `/todos` instead of `/todo`. This enables the root endpoint to be a `POST` to submit a
new resource, and a `GET` to fetch a list of resources with query string filters. These can be a "minimal" payload for
performance reasons that provide HATEOAS links to additional data or the whole object.

Under each resource is an `/{id}` path parameter which allows you to fetch a single document. A `GET` and `PUT` endpoint
are exposed to fetch and update the resource, respectively. If the resource has sub-resources, the same logic described
above is used to describe all those details.

Under an individual resource, none to many "actions" endpoint can be defined that use `POST` to transition the state of
an object in some way, such as adding an item to a cart or submitting an order. Ideally these concepts can be
represented by other resources, but sometimes this is necessary.

# Models

The same models used to fetch an object can be used to update a model. The path parameter will populate the `id` field
in the instance of `PUT`, hence the `id` field is read only to JSON (de)serialization.

# Headers

Standard headers should always be preferred. `Accept-Language`, `Authorization`, etc.
