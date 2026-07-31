import { describe, expect, it } from "vitest";

import { doStories } from "@src/core/do-work/do-stories";
import { Capacity, Story } from "@src/core/model";

describe("Working on a single story for a single day", () => {
  it.each<{
    description: string;
    capacity: Capacity;
    initialStories: Story[];
    expectedStories: Story[];
  }>([
    {
      description: "reduces a story days remaining",
      capacity: { forStories: 1 },
      initialStories: [
        { points: 3, daysRemaining: 3, status: "To Do", history: [] },
      ],
      expectedStories: [
        {
          points: 3,
          daysRemaining: 2,
          status: "In Progress",
          history: [{ date: 3, fromStatus: "To Do", toStatus: "In Progress" }],
        },
      ],
    },
    {
      description: "completes a story",
      capacity: { forStories: 1 },
      initialStories: [
        {
          points: 3,
          daysRemaining: 1,
          status: "In Progress",
          history: [{ date: 0, fromStatus: "To Do", toStatus: "In Progress" }],
        },
      ],
      expectedStories: [
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
    {
      description: "does no extra work",
      capacity: { forStories: 1 },
      initialStories: [
        { points: 3, daysRemaining: 0, status: "Done", history: [] },
      ],
      expectedStories: [
        { points: 3, daysRemaining: 0, status: "Done", history: [] },
      ],
    },
  ])("$description", ({ capacity, initialStories, expectedStories }) => {
    // When
    const actualStories = doStories(3, initialStories, capacity.forStories);

    // Then
    expect(actualStories).toEqual(expectedStories);
  });
});

describe("Working on one or more stories for multiple days", () => {
  const forDays = 4;
  const initialDate = 0;
  const storyCapacity = 2;
  const workForDays = (
    daysRemaining: number,
    currentDate: number,
    stories: Story[],
  ): Story[] =>
    daysRemaining == 0
      ? stories
      : workForDays(
          daysRemaining - 1,
          currentDate + 1,
          doStories(currentDate, stories, storyCapacity),
        );

  it.each<{
    description: string;
    initialStories: Story[];
    expectedStories: Story[];
  }>([
    {
      description: "completes a story given sufficient time",
      initialStories: [
        { points: 3, daysRemaining: 3, status: "To Do", history: [] },
      ],
      expectedStories: [
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
    {
      description: "completes multiple stories given sufficient time",

      initialStories: [
        { points: 3, daysRemaining: 3, status: "To Do", history: [] },
        { points: 2, daysRemaining: 2, status: "To Do", history: [] },
      ],
      expectedStories: [
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
  ])("$description", ({ initialStories, expectedStories }) => {
    // Given
    // When
    const actualStories = workForDays(forDays, initialDate, initialStories);

    // Then
    expect(actualStories).toEqual(expectedStories);
  });
});
