import type { Capacity, WorkItems, Story, StoryStatus } from "src/core/model";


// TODO apply capacity to reduce daysRemaining on workItems to none
// So ...
//  * split the work items into those to do?
//  	- a hidden, natural WIP limit
//  * reduce those with days remaining by one?
//  * Check status updates
//  * Form the complete list again and return it
export const doWork = (capacity: Capacity, workItems: WorkItems): WorkItems =>  {
  const stories = doStories(workItems.stories, capacity.forStories);
  return {...workItems, stories};
}

const doStories = (stories: Story[], storyCapacity: number): Story[] => {
  if (storyCapacity == 0) return stories;

  const currentStory = stories.shift();
  if (!currentStory) return []


  if (currentStory.status == "Done") {
    return [currentStory, ...doStories(stories, storyCapacity)]
  }

  const daysRemaining = currentStory.daysRemaining - 1;

  const status: StoryStatus = daysRemaining == 0 ? "Done": "In Progress"
  const workedOnStory = { ...currentStory, daysRemaining, status }
  return [workedOnStory, ...doStories(stories, storyCapacity - 1)]
}
