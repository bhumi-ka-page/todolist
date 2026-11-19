import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const emptyForm = { title: "", description: "", priority: "Medium", dueDate: "" };

export default function TaskForm({ task, onClose, onSave, saving, error }) {
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setForm(task ? {
      title: task.title,
      description: task.description || "",
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
    } : emptyForm);
  }, [task]);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    if (!form.title.trim()) {
      setFormError("Give your task a title before saving.");
      return;
    }
    setFormError("");
    await onSave({ ...form, title: form.title.trim(), description: form.description.trim() });
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="task-modal" role="dialog" aria-modal="true" aria-labelledby="task-form-title">
        <div className="modal-header">
          <div>
            <span className="eyebrow">{task ? "MAKE IT JUST RIGHT" : "A FRESH START"}</span>
            <h2 id="task-form-title">{task ? "Edit task" : "Create a task"}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close dialog"><FiX /></button>
        </div>
        <form onSubmit={submit}>
          <label className="form-field">
            <span>Task title <b>*</b></span>
            <input autoFocus maxLength="120" name="title" onChange={updateField} placeholder="What needs to get done?" value={form.title} />
          </label>
          <label className="form-field">
            <span>Description <small>OPTIONAL</small></span>
            <textarea maxLength="1000" name="description" onChange={updateField} placeholder="Add a few helpful details…" rows="3" value={form.description} />
          </label>
          <div className="form-row">
            <label className="form-field">
              <span>Priority</span>
              <select name="priority" onChange={updateField} value={form.priority}>
                <option>Low</option><option>Medium</option><option>High</option>
              </select>
            </label>
            <label className="form-field">
              <span>Due date</span>
              <input name="dueDate" onChange={updateField} type="date" value={form.dueDate} />
            </label>
          </div>
          {formError && <p className="form-error" role="alert">{formError}</p>}
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="modal-actions">
            <button className="button button-quiet" onClick={onClose} type="button">Cancel</button>
            <button className="button button-primary" disabled={saving} type="submit">
              {saving ? "Saving…" : task ? "Save changes" : "Create task"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
