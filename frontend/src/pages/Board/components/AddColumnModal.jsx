// src/pages/Board/components/AddColumnModal.jsx
import React from "react";
import { useState } from "react";
import Modal from "../../../components/modal";

const AddColumnModal = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Column title is required");
      return;
    }

    onSubmit(title.trim());
    onClose();
  };

  return (
    <Modal
      title="Add Column"
      onClose={onClose}
      actions={
        <>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" form="add-column-form">
            Add Column
          </button>
        </>
      }
    >
      <form id="add-column-form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError("");
            }}
          />
          {error && <p className="field-error">{error}</p>}
        </div>
      </form>
    </Modal>
  );
};

export default AddColumnModal;
