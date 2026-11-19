import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

export async function getTasks() {
  const { data } = await api.get("/tasks");
  return data;
}

export async function createTask(task) {
  const { data } = await api.post("/tasks", task);
  return data;
}

export async function updateTask(id, changes) {
  const { data } = await api.put(`/tasks/${id}`, changes);
  return data;
}

export async function deleteTask(id) {
  await api.delete(`/tasks/${id}`);
}
