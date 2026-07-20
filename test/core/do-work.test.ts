import { describe, expect, it } from 'vitest'

import { doWork } from "../../src/core/do-work"

describe('Working on a single story', () => {
  it.each([
    {
      description: 'reduces a story days remaining',
      capacity: { forStories: 1 },
      initialWorkItems: { stories: [{ points: 3, daysRemaining: 3, status: 'To Do', history: [] }] },
      expectedWorkItems: { stories: [{ points: 3, daysRemaining: 2, status: 'In Progress', history: [{date: 3, fromStatus: "To Do", toStatus: "In Progress"}] }] }
    },
    {
      description: 'completes a story',
      capacity: { forStories: 1 },
      initialWorkItems: { stories: [{ points: 3, daysRemaining: 1, status: 'In Progress', history: [{date:0, fromStatus: "To Do", toStatus: "In Progress"}] }] },
      expectedWorkItems: { stories: [{ points: 3, daysRemaining: 0, status: 'Done', history: [{date:0, fromStatus: "To Do", toStatus: "In Progress"}, {date:3, fromStatus:"In Progress", toStatus:"Done"}] }] }
    },
    {
      description: 'does no extra work',
      capacity: { forStories: 1 },
      initialWorkItems: { stories: [{ points: 3, daysRemaining: 0, status: 'Done', history: [] }] },
      expectedWorkItems: { stories: [{ points: 3, daysRemaining: 0, status: 'Done', history: [] }] }
    }
  ])('$description', ({ capacity, initialWorkItems, expectedWorkItems }) => {
    // When
    const actualWorkItems = doWork(3, capacity, initialWorkItems);

    // Then
    expect(actualWorkItems).toEqual(expectedWorkItems);
  })
})
