import { TASKS_URL } from "./constants";
import type { CreateTaskInput, Task } from "./types";

async function handleResponse(res: Response): Promise<any> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `HTTP ${res.status} ${res.statusText}${text ? ` - ${text}` : ""}`
    );
  }
  return res.json();
}

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(TASKS_URL);
  const data = await handleResponse(res);
  return data;
}

export async function getTask(id: Task["id"]): Promise<Task> {
  const res = await fetch(`${TASKS_URL}/${id}`);
  const data = await handleResponse(res);
  return data;
}

export async function createTask(data: CreateTaskInput): Promise<Task> {
  const res = await fetch(TASKS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const created = await handleResponse(res);
  return created;
}

export async function updateTaskPut(id: Task["id"], data: Task): Promise<Task> {
  const res = await fetch(`${TASKS_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const updated = await handleResponse(res);
  return updated;
}

export async function updateTaskPatch(
  id: number,
  data: Partial<CreateTaskInput>
): Promise<Task> {
  const res = await fetch(`${TASKS_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const updated = await handleResponse(res);
  return updated;
}

export async function deleteTask(id: Task["id"]): Promise<void> {
  const res = await fetch(`${TASKS_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }
}
