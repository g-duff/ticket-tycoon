import { SizedStory } from "@src/model";

export const doStories = (
  storyWorkflow: Record<string, string>,
  storyCapacity: Record<string, number>,
  stories: SizedStory[],
): SizedStory[] => {
  const thisStory = stories.shift();
  if (thisStory == undefined) return [];

  if (thisStory.status == "Done") {
    return [thisStory, ...doStories(storyWorkflow, storyCapacity, stories)];
  }

  const hasCapacity = storyCapacity[thisStory.status] > 0;
  const delta = hasCapacity ? 1 : 0;

  const nextCapacity = {
    ...storyCapacity,
    [thisStory.status]: storyCapacity[thisStory.status] - delta,
  };

  const nextRemainingEfforts = {
    ...thisStory.remainingEfforts,
    [thisStory.status]: thisStory.remainingEfforts[thisStory.status] - delta,
  };

  // IF there's no effort left then move to next status
  const nextStatus = (thisStory.remainingEfforts[thisStory.status] == 0) ? storyWorkflow[thisStory.status] : thisStory.status;

  const nextStory: SizedStory = {
    ...thisStory,
    status: nextStatus,
    remainingEfforts: nextRemainingEfforts
  };

  return [nextStory, ...doStories(storyWorkflow, nextCapacity, stories)];
};
