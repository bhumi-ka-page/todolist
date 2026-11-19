import React from "react";
import { FiCheckSquare, FiGrid, FiInbox, FiPlus, FiSun, FiCheckCircle } from "react-icons/fi";

const navigation = [
  { id: "all", label: "All tasks", icon: FiGrid },
  { id: "today", label: "Today", icon: FiSun },
  { id: "pending", label: "Upcoming", icon: FiInbox },
  { id: "completed", label: "Completed", icon: FiCheckCircle },
];

export default function Sidebar({ activeView, onChangeView, onAddTask, counts }) {
  return (
    <aside className="sidebar">
      <a className="brand" href="#" aria-label="Taskflow home">
        <span className="brand-mark"><FiCheckSquare /></span>
        <span>taskflow<span className="brand-period">.</span></span>
      </a>

      <div className="workspace-label">WORKSPACE</div>
      <nav className="side-nav" aria-label="Task views">
        {navigation.map(({ id, label, icon: Icon }) => (
          <button
            aria-label={label}
            className={`nav-item ${activeView === id ? "active" : ""}`}
            key={id}
            onClick={() => onChangeView(id)}
            type="button"
          >
            <Icon aria-hidden="true" />
            <span>{label}</span>
            <span className="nav-count">{counts[id] ?? 0}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="focus-card">
          <span className="focus-icon"><FiSun /></span>
          <strong>A little progress<br />goes a long way.</strong>
          <span>Keep your momentum going.</span>
        </div>
        <button className="sidebar-add" type="button" onClick={onAddTask}>
          <FiPlus aria-hidden="true" /> Add a task
        </button>
      </div>
    </aside>
  );
}
