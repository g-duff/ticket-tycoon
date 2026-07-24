import { describe, expect, it } from "vitest";

import { doWork } from "@src/core/do-work";
import { Capacity, WorkItems } from "@src/core/model";

describe("Working on a single story for a single day", () => {
  it.each([
    {
      description: "reduces a story days remaining",
      capacity: { forStories: 1 },
      initialWorkItems: {
        stories: [
          { points: 3, daysRemaining: 3, status: "To Do", history: [] },
        ],
      },
      expectedWorkItems: {
        stories: [
          {
            points: 3,
            daysRemaining: 2,
            status: "In Progress",
            history: [
              { date: 3, fromStatus: "To Do", toStatus: "In Progress" },
            ],
          },
        ],
      },
    },
    {
      description: "completes a story",
      capacity: { forStories: 1 },
      initialWorkItems: {
        stories: [
          {
            points: 3,
            daysRemaining: 1,
            status: "In Progress",
            history: [
              { date: 0, fromStatus: "To Do", toStatus: "In Progress" },
            ],
          },
        ],
      },
      expectedWorkItems: {
        stories: [
          {
            points: 3,
            daysRemaining: 0,
            status: "Done",
            history: [
              { date: 0, fromStatus: "To Do", toStatus: "In Progress" },
              { date: 3, fromStatus: "In Progress", toStatus: "Done" },
            ],
          },
        ],
      },
    },
    {
      description: "does no extra work",
      capacity: { forStories: 1 },
      initialWorkItems: {
        stories: [{ points: 3, daysRemaining: 0, status: "Done", history: [] }],
      },
      expectedWorkItems: {
        stories: [{ points: 3, daysRemaining: 0, status: "Done", history: [] }],
      },
    },
  ])("$description", ({ capacity, initialWorkItems, expectedWorkItems }) => {
    // When
    const actualWorkItems = doWork(3, capacity, initialWorkItems);

    // Then
    expect(actualWorkItems).toEqual(expectedWorkItems);
  });
});

describe("Working on one or more stories for multiple days", () => {
  const forDays = 4;
  const initialDate = 0;
  const capacity: Capacity = { forStories: 2 };
  const workForDays = (
    daysRemaining: number,
    currentDate: number,
    workItems: WorkItems,
  ): WorkItems =>
    daysRemaining == 0
      ? workItems
      : workForDays(
          daysRemaining - 1,
          currentDate + 1,
          doWork(currentDate, capacity, workItems),
        );

  it.each([
    {
      description: "completes a story given sufficient time",

      initialWorkItems: {
        stories: [
          { points: 3, daysRemaining: 3, status: "To Do", history: [] },
        ],
      },
      expectedWorkItems: {
        stories: [
          {
            points: 3,
            daysRemaining: 0,
            status: "Done",
            history: [
              { date: 0, fromStatus: "To Do", toStatus: "In Progress" },
              { date: 2, fromStatus: "In Progress", toStatus: "Done" },
            ],
          },
        ],
      },
    },
    {
      description: "completes multiple stories given sufficient time",

      initialWorkItems: {
        stories: [
          { points: 3, daysRemaining: 3, status: "To Do", history: [] },
          { points: 2, daysRemaining: 2, status: "To Do", history: [] },
        ],
      },
      expectedWorkItems: {
        stories: [
          {
            points: 3,
            daysRemaining: 0,
            status: "Done",
            history: [
              { date: 0, fromStatus: "To Do", toStatus: "In Progress" },
              { date: 2, fromStatus: "In Progress", toStatus: "Done" },
            ],
          },
          {
            points: 2,
            daysRemaining: 0,
            status: "Done",
            history: [
              { date: 0, fromStatus: "To Do", toStatus: "In Progress" },
              { date: 1, fromStatus: "In Progress", toStatus: "Done" },
            ],
          },
        ],
      },
    },
  ])("$description", ({ initialWorkItems, expectedWorkItems }) => {
    // Given
    // When
    const actualWorkItems = workForDays(forDays, initialDate, initialWorkItems);

    // Then
    expect(actualWorkItems).toEqual(expectedWorkItems);
  });
});
