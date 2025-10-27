import type { PRIORITIES, STATUSES } from "./constants";

export type Status = (typeof STATUSES)[keyof typeof STATUSES];
export type Priority = (typeof PRIORITIES)[keyof typeof PRIORITIES];

export type Task = {
  id: number;
  title: string;
  createdAt: Date;

  description?: string;
  status?: Status;
  priority?: Priority;
  deadline?: Date;
};

export type CreateTaskInput = Omit<Task, "id">;

export type UpdateTaskInput = Partial<CreateTaskInput>;

export type TaskFilters = {
  status?: Status | Status[];
  priority?: Priority | Priority[];
  createdAt?: Date;
};
