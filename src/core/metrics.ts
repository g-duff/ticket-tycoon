import type { WorkItems, Story } from "@src/core/model";

export const createMetrics = (workItems: WorkItems): Record<string, number> => {
  return completion(workItems.stories);
};

const completion = (stories: Story[]) => {
  const doneCount = stories.reduce((c, s) => {
    c += s.status == "Done" ? 1 : 0;
    return c;
  }, 0);
  const totalCount = stories.length;
  return {
    done: doneCount,
    total: totalCount,
    completion: doneCount / totalCount,
  };
};
