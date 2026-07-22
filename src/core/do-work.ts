import type { Capacity, WorkItems, Story, StoryStatus } from "src/core/model";

// TODO apply capacity to reduce daysRemaining on workItems to none
// So ...
//  * split the work items into those to do?
//  	- a hidden, natural WIP limit
//  * reduce those with days remaining by one?
//  * Check status updates
//  * Form the complete list again and return it
export const doWork = (
  onDate: number,
  capacity: Capacity,
  workItems: WorkItems,
): WorkItems => {
  const stories = doStories(onDate, workItems.stories, capacity.forStories);
  return { ...workItems, stories };
};

const doStories = (
  onDate: number,
  stories: Story[],
  storyCapacity: number,
): Story[] => {
  if (storyCapacity == 0) return stories;

  const currentStory = stories.shift();
  if (!currentStory) return [];

  if (currentStory.status == "Done") {
    return [currentStory, ...doStories(onDate, stories, storyCapacity)];
  }

  const daysRemaining = currentStory.daysRemaining - 1;
  const nextStatus: StoryStatus = daysRemaining == 0 ? "Done" : "In Progress";

  const history =
    currentStory.status == nextStatus
      ? currentStory.history
      : [
          ...currentStory.history,
          {
            date: onDate,
            fromStatus: currentStory.status,
            toStatus: nextStatus,
          },
        ];
  const workedOnStory = {
    ...currentStory,
    daysRemaining,
    status: nextStatus,
    history,
  };

  return [workedOnStory, ...doStories(onDate, stories, storyCapacity - 1)];
};
