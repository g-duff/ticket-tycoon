import type { Story, StoryStatus } from "@src/core/model";

export const doStories = (
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
