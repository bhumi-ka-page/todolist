import React from "react";
import { FiArrowUpRight, FiCheckCircle, FiPlus, FiSearch, FiTarget } from "react-icons/fi";
import Sidebar from "../components/Sidebar.jsx";
import StatCard from "../components/StatCard.jsx";
import TaskCard from "../components/TaskCard.jsx";

const headings = {
  all: ["Your overview", "A clear mind starts with a clear plan."],
  today: ["Today’s focus", "Make today count, one task at a time."],
  pending: ["Coming up", "Here’s what’s still on your list."],
  completed: ["Your wins", "Look at all the things you’ve accomplished."],
};

function greetingName() {
  const hour = new Date().getHours();
  return hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
}

export default function Dashboard({
  tasks, loading, activeView, onChangeView, onAddTask, onToggle, onEdit, onDelete,
  search, onSearch, priority, onPriority, error,
}) {
  const now = new Date();
  const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;
  const counts = {
    all: total,
    today: tasks.filter((task) => task.dueDate?.slice(0, 10) === todayKey && !task.completed).length,
    pending,
    completed,
  };
  const progress = total ? Math.round((completed / total) * 100) : 0;
  const visibleTasks = tasks.filter((task) => {
    const matchesView = activeView === "all" ||
      (activeView === "completed" && task.completed) ||
      (activeView === "pending" && !task.completed) ||
      (activeView === "today" && !task.completed && task.dueDate?.slice(0, 10) === todayKey);
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priority === "all" || task.priority === priority;
    return matchesView && matchesSearch && matchesPriority;
  });
  const [title, subtitle] = headings[activeView];

  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} onChangeView={onChangeView} onAddTask={onAddTask} counts={counts} />
      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><span className="breadcrumb-slash">/</span><strong>{title}</strong></div>
          <div className="topbar-user"><span className="avatar">J</span><span>My workspace</span></div>
        </header>
        <div className="dashboard-body">
          <section className="welcome-row">
            <div>
              <span className="eyebrow">{greetingName().toUpperCase()} <span className="sun-mark">✳</span></span>
              <h1>{title}<span className="title-dot">.</span></h1>
              <p>{subtitle}</p>
            </div>
            <button className="button button-primary add-task-button" onClick={onAddTask} type="button">
              <FiPlus /> New task
            </button>
          </section>

          <section className="stats-grid" aria-label="Task statistics">
            <StatCard label="Total tasks" value={total} detail="Tasks on your list" icon={FiTarget} tone="violet" />
            <StatCard label="Completed" value={completed} detail="One step at a time" icon={FiCheckCircle} tone="mint" />
            <StatCard label="Still to do" value={pending} detail={pending ? "You’ve got this" : "All caught up!"} icon={FiArrowUpRight} tone="peach" />
            <article className="stat-card progress-card">
              <div className="progress-ring" style={{ "--progress": `${progress}%` }}><span>{progress}<small>%</small></span></div>
              <div className="stat-copy"><span>Progress</span><strong>{progress}%</strong><small>Of your tasks complete</small></div>
            </article>
          </section>

          <section className="task-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">YOUR LIST</span>
                <h2>{activeView === "all" ? "Tasks" : title}<span className="task-total">{visibleTasks.length}</span></h2>
              </div>
              <div className="task-controls">
                <label className="search-box">
                  <FiSearch aria-hidden="true" />
                  <input aria-label="Search tasks by title" onChange={(event) => onSearch(event.target.value)} placeholder="Search tasks…" value={search} />
                </label>
                <select aria-label="Filter by priority" className="priority-filter" onChange={(event) => onPriority(event.target.value)} value={priority}>
                  <option value="all">All priorities</option>
                  <option value="High">High priority</option>
                  <option value="Medium">Medium priority</option>
                  <option value="Low">Low priority</option>
                </select>
              </div>
            </div>

            {error && <div className="notice notice-error" role="alert">{error}</div>}
            {loading ? (
              <div className="loading-state"><span className="spinner" /> Loading your tasks…</div>
            ) : visibleTasks.length ? (
              <div className="task-list">
                {visibleTasks.map((task) => (
                  <TaskCard key={task._id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-illustration"><FiCheckCircle /></div>
                <h3>{search || priority !== "all" ? "No tasks match those filters" : activeView === "completed" ? "Your wins are waiting" : "Your list is wonderfully clear"}</h3>
                <p>{search || priority !== "all" ? "Try changing your search or priority filter." : "Add a task to get the ball rolling. You’ve got this."}</p>
                {!search && priority === "all" && activeView !== "completed" && (
                  <button className="button button-primary" onClick={onAddTask} type="button"><FiPlus /> Add your first task</button>
                )}
              </div>
            )}
          </section>
          <footer className="dashboard-footer"><span>Made for a more focused day</span><span>Small steps, big things <span className="footer-heart">♥</span></span></footer>
        </div>
      </main>
    </div>
  );
}
