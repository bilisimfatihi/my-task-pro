// src/pages/Board/components/CardItem.jsx
import React from "react";
import { useState } from "react";

const CardItem = ({
  card,
  columnId,
  allColumns,
  onDeleteCard,
  onMoveCard,
  onEdit,
}) => {
  const [moveOpen, setMoveOpen] = useState(false);

  const handleDelete = () => {
    if (window.confirm("Delete this card?")) {
      onDeleteCard(card.id);
    }
  };

  const deadlineDate = card.deadline ? new Date(card.deadline) : null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isToday =
    deadlineDate &&
    deadlineDate.getFullYear() === today.getFullYear() &&
    deadlineDate.getMonth() === today.getMonth() &&
    deadlineDate.getDate() === today.getDate();

  return (
    <article className="card-item">
      <h4>{card.title}</h4>
      <p>{card.description}</p>

      <div className="card-meta">
        <span className={`priority priority-${card.priority}`}>
          {card.priority}
        </span>
        {card.deadline && (
          <span className="deadline">
            {new Date(card.deadline).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="card-actions">
        {/* Taşı */}
        <div className="move-wrapper">
          <button type="button" onClick={() => setMoveOpen((p) => !p)}>
            ⇄
          </button>
          {moveOpen && (
            <div className="move-tooltip">
              {allColumns
                .filter((c) => c.id !== columnId)
                .map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      onMoveCard(card.id, c.id);
                      setMoveOpen(false);
                    }}
                  >
                    {c.title}
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Sil */}
        <button type="button" onClick={handleDelete}>
          🗑
        </button>

        {/* Düzenle */}
        <button type="button" onClick={() => onEdit(card)}>
          ✏️
        </button>

        {/* Zil – deadline bugünse */}
        {isToday && (
          <button type="button" className="bell" title="Deadline is today">
            🔔
          </button>
        )}
      </div>
    </article>
  );
};

export default CardItem;

