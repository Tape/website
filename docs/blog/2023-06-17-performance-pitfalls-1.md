---
date: 2023-06-17
title: Performance Pitfalls 1
---

This is the first blog in a series about performance tuning real world applications where sometimes the most clear
things are really not so clear after all.

---

## Intro

I'll preface this with the disclaimer that all issues below can be remedied by configuration values, but today's story
begins with a Spring utility called [RestTemplate](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/client/RestTemplate.html).
A service that had been developed prior to me joining the team had made pretty heavy use of this incredibly useful
library for service to service communication. What wasn't very clear though was why a relatively light-weight operation
appeared to be heavily bogging down our service throughput, which is why many more avenues were explored before arriving
at the inner workings of RestTemplate.

## Other Considerations

If you take a peek at the documentation we can see there is a lovely disclaimer provided letting us know about a looming
deprecation.

> **NOTE:** As of 5.0 this class is in maintenance mode, with only minor requests for changes and bugs to be accepted
> going forward. Please, consider using the `org.springframework.web.reactive.client.WebClient` which has a more modern
> API and supports sync, async, and streaming scenarios.

While it doesn't directly state that it has been deprecated, I feel it's safe to say that when a feature rich piece of
software is no longer receiving updates outside bugfixes or minor changes is on the path to deprecation.

## The Problem

As stated in the intro, we found ourselves running into throughput issues. From optimizing downstream services, to
intentionally slowing down ETLs, our team felt like we had exhausted our options. One thing was consistent though. We
would see connection timeouts coming from the RestTemplate. It had become very easy to blame downstream services (mainly
because they were vendor products), but the data did not seem to line up.

Then we started looking at RestTemplate itself. Under the hood, RestTemplate uses Apache's HttpClient. Turns out the
defaults for this library has some pretty strange defaults. See this wonderfully explained
[StackOverflow question](https://stackoverflow.com/questions/44188847/springs-resttemplate-default-connection-pool).
Essentially, per-host you're limited to 5 concurrent connections and any connections that are made while those are in
progress will queue up. While in queue, they're still counting against the timeouts established for time until response.
This is what eventually lead to our timeouts.

## Conclusion

While the configuration value can be increased, migrating to WebClient also takes care of the issue. A more sane and
modern strategy has been applied which allows significantly higher throughput (500 at the time of writing). There are
some other very protective gotchas that WebClient has, but it is the most reasonable option given the looming retirement
of RestTemplate.
