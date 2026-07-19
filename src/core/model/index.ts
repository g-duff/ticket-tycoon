import type { Story } from "src/core/model/story";

export interface Metrics {
  averageCycleTime: number
  averageLeadTime: number
  completionPercentage: number
  scopeChangePercentage: number
  carryOverPercentage: number
}

export interface Capacity {
  forStories: number
}

export interface WorkItems {
  stories: Story[]
}

export type { Story };
export type { StoryStatus } from "src/core/model/story";
export type { StoryEvent } from "src/core/model/story";
