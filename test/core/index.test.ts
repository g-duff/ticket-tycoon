import { describe, expect, test } from "vitest";

import { doWork } from "@src/core/do-work";
import { createMetrics } from "@src/core/metrics";

import type { Capacity, WorkItems } from "@src/core/model";

describe("misc", () => {
  const workForDays = (
    daysRemaining: number,
    currentDate: number,
    capacity: Capacity,
    workItems: WorkItems,
  ): WorkItems =>
    daysRemaining == 0
      ? workItems
      : workForDays(
          daysRemaining - 1,
          currentDate + 1,
          capacity,
          doWork(capacity, currentDate, workItems),
        );

  test("Easily too little work", () => {
    const capacity: Capacity = { forStories: 4 };
    const workItems: WorkItems = {
      stories: [
        {
          status: "To Do",
          points: 3,
          daysRemaining: 3,
          history: [],
        },
        {
          status: "To Do",
          points: 3,
          daysRemaining: 3,
          history: [],
        },
      ],
    };

    // When
    const actualMetrics = createMetrics(
      workForDays(10, 0, capacity, workItems),
    );

    // Then
    expect(actualMetrics).toEqual({
      total: 2,
      done: 2,
      completion: 1,
    });
  });

  test("Some work", () => {
    const capacity: Capacity = { forStories: 2 };
    const workItems: WorkItems = {
      stories: [
        {
          status: "To Do",
          points: 7,
          daysRemaining: 7,
          history: [],
        },
        {
          status: "To Do",
          points: 7,
          daysRemaining: 7,
          history: [],
        },
        {
          status: "To Do",
          points: 10,
          daysRemaining: 10,
          history: [],
        },
        {
          status: "To Do",
          points: 10,
          daysRemaining: 10,
          history: [],
        },
      ],
    };

    // When
    const actualMetrics = createMetrics(
      workForDays(10, 0, capacity, workItems),
    );

    // Then
    expect(actualMetrics).toEqual({
      total: 4,
      done: 2,
      completion: 0.5,
    });
  });

  test("Too much work", () => {
    const capacity: Capacity = { forStories: 2 };
    const workItems: WorkItems = {
      stories: [
        {
          status: "To Do",
          points: 12,
          daysRemaining: 12,
          history: [],
        },
        {
          status: "To Do",
          points: 12,
          daysRemaining: 12,
          history: [],
        },
        {
          status: "To Do",
          points: 12,
          daysRemaining: 12,
          history: [],
        },
        {
          status: "To Do",
          points: 12,
          daysRemaining: 12,
          history: [],
        },
      ],
    };

    // When
    const actualMetrics = createMetrics(
      workForDays(10, 0, capacity, workItems),
    );

    // Then
    expect(actualMetrics).toEqual({ total: 4, done: 0, completion: 0 });
  });
});
