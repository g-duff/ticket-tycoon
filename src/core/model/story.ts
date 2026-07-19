import { Optional } from "src/types"


export interface Story {
  status: StoryStatus
  points: number
  daysRemaining: number
  history: StoryEvent[]
}

export type StoryStatus = "To Do" | "In Progress" | "Done"

export interface StoryEvent {
  date: number
  statusChange: Optional<StoryStatusChange>
}

interface StoryStatusChange {
  fromStatus: StoryStatus
  toStatus: StoryStatus
}
