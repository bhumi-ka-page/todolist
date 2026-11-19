import React, { useCallback, useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard.jsx";
import TaskForm from "./components/TaskForm.jsx";
import { createTask, deleteTask, getTasks, updateTask } from "./services/tasks.js";

function getErrorMessage(error) {
  return error.response?.data?.message || error.message || "Something went wrong. Please try again.";
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [activeView, setActiveView] = useState("all");
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("all");
  const [formTask, setFormTask] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setTasks(await getTasks());
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadTasks(); }, [loadTasks]);
  useEffect(() => {
    if (!notice) return undefined;
    const timeout = window.setTimeout(() => setNotice(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  function openCreateForm() {
    setFormTask(null);
    setFormOpen(true);
  }

  function openEditForm(task) {
    setFormTask(task);
    setFormOpen(true);
  }

  async function saveTask(values) {
    setSaving(true);
    setError("");
    try {
      if (formTask) {
        const updated = await updateTask(formTask._id, values);
        setTasks((current) => current.map((task) => task._id === updated._id ? updated : task));
        setNotice("Your task has been updated.");
      } else {
        const created = await createTask(values);
        setTasks((current) => [created, ...current]);
        setNotice("Your new task is on the list.");
      }
      setFormOpen(false);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setSaving(false);
    }
  }

  async function toggleTask(task) {
    setError("");
    try {
      const updated = await updateTask(task._id, { completed: !task.completed });
      setTasks((current) => current.map((item) => item._id === updated._id ? updated : item));
      setNotice(updated.completed ? "Nicely done — task completed!" : "Task moved back to your list.");
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  }

  async function removeTask(task) {
    if (!window.confirm(`Delete "${task.title}"? This can’t be undone.`)) return;
    setError("");
    try {
      await deleteTask(task._id);
      setTasks((current) => current.filter((item) => item._id !== task._id));
      setNotice("Task deleted.");
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  }

  return (
    <>
      <Dashboard
        tasks={tasks} loading={loading} activeView={activeView} onChangeView={setActiveView}
        onAddTask={openCreateForm} onToggle={toggleTask} onEdit={openEditForm} onDelete={removeTask}
        search={search} onSearch={setSearch} priority={priority} onPriority={setPriority} error={error}
      />
      {notice && <div className="toast" role="status">{notice}</div>}
      {formOpen && <TaskForm task={formTask} onClose={() => setFormOpen(false)} onSave={saveTask} saving={saving} error={error} />}
    </>
  );
}
