// src/pages/Board/components/AddCardModal.jsx
import React from "react";
import { useState } from "react";
import Modal from "../../../components/modal";

const priorities = [
  { value: "none", label: "Önceliksiz" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const getTodayISO = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
};

const AddCardModal = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("none");
  const [deadline, setDeadline] = useState(getTodayISO());
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Title is required";
    if (!description.trim()) e.description = "Description is required";

    const today = new Date(getTodayISO());
    const selected = new Date(deadline);
    if (selected < today) e.deadline = "Deadline cannot be in the past";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      deadline,
    });
    onClose();
  };

  return (
    <Modal
      title="Add Card"
      onClose={onClose}
      actions={
        <>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" form="add-card-form">
            Add
          </button>
        </>
      }
    >
      <form id="add-card-form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((p) => ({ ...p, title: "" }));
            }}
          />
          {errors.title && <p className="field-error">{errors.title}</p>}
        </div>

        <div className="field">
          <label>Description *</label>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description)
                setErrors((p) => ({ ...p, description: "" }));
            }}
          />
          {errors.description && (
            <p className="field-error">{errors.description}</p>
          )}
        </div>

        <div className="field">
          <label>Priority</label>
          <div className="radio-group">
            {priorities.map((p) => (
              <label key={p.value}>
                <input
                  type="radio"
                  name="priority"
                  value={p.value}
                  checked={priority === p.value}
                  onChange={(e) => setPriority(e.target.value)}
                />
                {p.label}
              </label>
            ))}
          </div>
        </div>

        <div className="field">
          <label>Deadline *</label>
          <input
            type="date"
            value={deadline}
            min={getTodayISO()}
            onChange={(e) => {
              setDeadline(e.target.value);
              if (errors.deadline)
                setErrors((p) => ({ ...p, deadline: "" }));
            }}
          />
          {errors.deadline && (
            <p className="field-error">{errors.deadline}</p>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default AddCardModal;
