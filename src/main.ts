import { createTask, getTasks } from "./api";
import type { Task, Priority, Status } from "./types";

const listEl = document.getElementById("task-list") as HTMLUListElement;
const formEl = document.getElementById("task-form") as HTMLFormElement;
const emptyEl = document.getElementById("empty") as HTMLDivElement;
const errorEl = document.getElementById("error") as HTMLDivElement;

function renderTaskItem(task: Task): HTMLLIElement {
  const li = document.createElement("li");
  li.className = "task";

  const created =
    task.createdAt instanceof Date
      ? task.createdAt
      : new Date(task.createdAt ?? Date.now());

  const deadline =
    task.deadline instanceof Date
      ? task.deadline
      : task.deadline
      ? new Date(task.deadline)
      : null;

  li.innerHTML = `
    <h3>${task.title}</h3>
    ${task.description ? `<div>${task.description}</div>` : ""}
    <div class="muted">
      <span>status: ${task.status ?? "-"}</span> ·
      <span>priority: ${task.priority ?? "-"}</span> ·
      <span>created: ${created.toLocaleString()}</span> ·
      <span>deadline: ${deadline ? deadline.toLocaleDateString() : "-"}</span>
    </div>
  `;
  return li;
}

async function renderTasks(): Promise<void> {
  listEl.innerHTML = "";
  errorEl.style.display = "none";
  emptyEl.style.display = "none";

  try {
    const tasks = await getTasks();
    if (!tasks.length) {
      emptyEl.style.display = "block";
      return;
    }

    for (const task of tasks) {
      listEl.appendChild(renderTaskItem(task));
    }
  } catch (err: any) {
    errorEl.textContent = err?.message ?? "Failed to load tasks";
    errorEl.style.display = "block";
  }
}

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = (
    document.getElementById("title") as HTMLInputElement
  ).value.trim();
  const description = (
    document.getElementById("description") as HTMLInputElement
  ).value.trim();
  const status = (document.getElementById("status") as HTMLSelectElement)
    .value as Status;
  const priority = (document.getElementById("priority") as HTMLSelectElement)
    .value as Priority;
  const deadlineRaw = (document.getElementById("deadline") as HTMLInputElement)
    .value;

  if (!title) return;

  const newTask: Omit<Task, "id"> = {
    title,
    description: description || undefined,
    status,
    priority,
    createdAt: new Date(),
    deadline: deadlineRaw ? new Date(deadlineRaw) : undefined,
  };

  try {
    const created = await createTask(newTask);

    listEl.appendChild(renderTaskItem(created));
    emptyEl.style.display = "none";
    formEl.reset();
  } catch (err: unknown) {
    if (err instanceof Error) {
      alert(`Error creating task: ${err.message}`);
    } else {
      alert(`Error creating task: ${String(err)}`);
    }
  }
});

renderTasks();
