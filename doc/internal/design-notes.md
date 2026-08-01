# Design notes

The objective is to create a record for what's happened to `WorkItems` over a period of time.

Over time:

- Epics are refined into stories
- Stories are worked on
  - And may be tested, and other workflows

WorkItems are worked on in a WorkFlow.

Workflows have constraints.

- First status is "Definitely not being worked on yet"
- Last status is "Done"
- Middle statuses:
  So what dictates whether a story transition to status? Properties of the
- Story: estimations
  - Can either estimate capacity for each status
- Team: capacity

Where capacity is per unit time (per one day).

Then `doWork` is the morphism

```
Capacity -> WorkItems -> WorkItems
```

Between `doWork`, `WorkItems` and their statuses should be appended to a [dated] log.

The log should be queriable for arbitrary metrics.
