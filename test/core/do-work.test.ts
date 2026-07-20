import { describe, expect, it } from 'vitest'

import { doWork } from "../../src/core/do-work"

describe('Working on a single story', () => {
  it.each([
    {
      description: 'reduces a story days remaining',
      capacity: { forStories: 1 },
      initialWorkItems: { stories: [{ points: 3, daysRemaining: 3, status: 'To Do' }] },
      expectedWorkItems: { stories: [{ points: 3, daysRemaining: 2, status: 'In Progress' }] }
    },
    {
      description: 'completes a story',
      capacity: { forStories: 1 },
      initialWorkItems: { stories: [{ points: 3, daysRemaining: 1, status: 'In Progress' }] },
      expectedWorkItems: { stories: [{ points: 3, daysRemaining: 0, status: 'Done' }] }
    },
    {
      description: 'does no extra work',
      capacity: { forStories: 1 },
      initialWorkItems: { stories: [{ points: 3, daysRemaining: 0, status: 'Done' }] },
      expectedWorkItems: { stories: [{ points: 3, daysRemaining: 0, status: 'Done' }] }
    }
  ])('$description', ({ capacity, initialWorkItems, expectedWorkItems }) => {
    // When
    const actualWorkItems = doWork(capacity, initialWorkItems);

    // Then
    expect(actualWorkItems).toEqual(expectedWorkItems);
  })
})
