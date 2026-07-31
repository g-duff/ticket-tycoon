import type { Capacity, WorkItems } from "@src/core/model";
import { doStories } from "@src/core/do-work/do-stories";

export const doWork = (
  capacity: Capacity,
  onDate: number,
  workItems: WorkItems,
): WorkItems => {
  const stories = doStories(onDate, workItems.stories, capacity.forStories);
  return { ...workItems, stories };
};
