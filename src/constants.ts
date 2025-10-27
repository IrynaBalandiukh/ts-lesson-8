export const STATUSES = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
} as const;

export const PRIORITIES = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
} as const;

const BASE_URL = "http://localhost:3001";
export const TASKS_URL = `${BASE_URL}/tasks`;
