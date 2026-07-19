import { describe, expect, it } from 'vitest'

import { doWork } from "../../src/core/do-work"

describe('Working on a single story', () => {
  it('reduces a story days remaining', () => {
    // Given
    const capacity = {
      forStories: 1
    }
    const initialWorkItems = {
      stories: [{points:3, daysRemaining:3, status: 'To Do'}]
    }

    // When
    const expectedWorkItems = doWork(capacity, initialWorkItems);

    // Then
    expect(expectedWorkItems).toBe({points:3, daysRemaining:2, status: 'In Progress'});
  })
})
