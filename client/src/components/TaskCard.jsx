import React from "react";
import { FiCalendar, FiCheck, FiEdit2, FiTrash2 } from "react-icons/fi";

function formatDueDate(value) {
  if (!value) return null;
  const date = new Date(`${value.slice(0, 10)}T00:00:00`);
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(date);
}

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const overdue = task.dueDate && !task.completed &&
    new Date(`${task.dueDate.slice(0, 10)}T23:59:59`) < new Date();

  return (
    <article className={`task-card ${task.completed ? "is-completed" : ""}`}>
      <button
        type="button"
        className={`task-check ${task.completed ? "checked" : ""}`}
        onClick={() => onToggle(task)}
        aria-label={task.completed ? `Mark ${task.title} as pending` : `Complete ${task.title}`}
      >
        {task.completed && <FiCheck aria-hidden="true" />}
      </button>
      <div className="task-content">
        <div className="task-heading">
          <h3>{task.title}</h3>
          <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
            <span />{task.priority}
          </span>
        </div>
        {task.description && <p className="task-description">{task.description}</p>}
        <div className={`task-due ${overdue ? "overdue" : ""}`}>
          <FiCalendar aria-hidden="true" />
          <span>{task.dueDate ? (overdue ? "Overdue · " : "") + formatDueDate(task.dueDate) : "No due date"}</span>
        </div>
      </div>
      <div className="task-actions">
        <button type="button" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`} title="Edit task">
          <FiEdit2 />
        </button>
        <button type="button" onClick={() => onDelete(task)} aria-label={`Delete ${task.title}`} title="Delete task">
          <FiTrash2 />
        </button>
      </div>
    </article>
  );
}
