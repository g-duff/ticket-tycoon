import type { WorkItems, Capacity } from "@src/core/model";
import { doWork } from "@src/core/do-work";

export const sprint = (
  date: number,
  days: number,
  capacity: Capacity,
  workItems: WorkItems,
): WorkItems => {
  for (let d = 0; d < days; d++) {
    workItems = doWork(capacity, date + d, workItems);
  }
  return workItems;
};
