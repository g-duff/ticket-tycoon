export interface Story {
  status: StoryStatus;
  points: number;
  daysRemaining: number;
  history: StoryStatusChange[];
}

export type StoryStatus = "To Do" | "In Progress" | "Done";

export interface StoryStatusChange {
  date: number;
  fromStatus: StoryStatus;
  toStatus: StoryStatus;
}
