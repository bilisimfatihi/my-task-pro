// src/pages/Board/components/Column.jsx
import React from "react";
import { useState } from "react";
import CardItem from "./CardItem";
import AddCardModal from "./AddCardModal";
import EditCardModal from "./EditCardModal";

const Column = ({
  column,
  allColumns,
  onDeleteColumn,
  onAddCard,
  onUpdateCard,
  onDeleteCard,
  onMoveCard,
}) => {
  const [addCardOpen, setAddCardOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const handleDeleteColumn = () => {
    if (window.confirm("Delete this column and all its cards?")) {
      onDeleteColumn(column.id);
    }
  };

  return (
    <div className="column">
      <div className="column-header">
        <h3>{column.title}</h3>
        <button type="button" onClick={handleDeleteColumn}>
          ✖
        </button>
      </div>

      <div className="column-cards">
        {column.cards?.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            columnId={column.id}
            allColumns={allColumns}
            onDeleteCard={onDeleteCard}
            onMoveCard={onMoveCard}
            onEdit={setEditingCard}
          />
        ))}
      </div>

      <button
        type="button"
        className="btn btn-link"
        onClick={() => setAddCardOpen(true)}
      >
        Add another card
      </button>

      {addCardOpen && (
        <AddCardModal
          onClose={() => setAddCardOpen(false)}
          onSubmit={(data) => {
            onAddCard(column.id, data);
          }}
        />
      )}

      {editingCard && (
        <EditCardModal
          card={editingCard}
          onClose={() => setEditingCard(null)}
          onSubmit={(data) => onUpdateCard(editingCard.id, data)}
        />
      )}
    </div>
  );
};

export default Column;
