// src/pages/Board/components/HeaderDashboard.jsx
import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentBoard } from "../../../redux/boards/selectors";
import { editBoardById } from "../../../redux/boards/operations";
import Modal from "../../../components/modal";
import "./HeaderDashboard.css";

const backgroundNames = [
  'balloon',
  'clouds',
  'flowers',
  'full-moon',
  'gorge',
  'kapadokia',
  'milky-way',
  'moon',
  'night',
  'ocean',
  'pink-tree',
  'plant',
  'rocks',
  'ship',
  'unsplash',
];

const FiltersModal = ({ bg, onBgChange, onClose, board }) => {
  const dispatch = useDispatch();
  const [selectedBg, setSelectedBg] = useState(bg || null);

  const handleBgSelect = (bgName) => {
    setSelectedBg(bgName);
  };

  const handleSave = async () => {
    if (board?._id) {
      await dispatch(editBoardById({
        boardId: board._id,
        updatedData: { background: selectedBg }
      }));
    }
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Filters">
      <div className="filters-modal-content">
        <div className="filters-section">
          <label>Background</label>
          <div className="background-grid">
            <button
              type="button"
              className={`bg-option ${selectedBg === null ? 'active' : ''}`}
              onClick={() => handleBgSelect(null)}
            >
              None
            </button>
            {backgroundNames.map((bgName) => (
              <button
                key={bgName}
                type="button"
                className={`bg-option ${selectedBg === bgName ? 'active' : ''}`}
                onClick={() => handleBgSelect(bgName)}
                style={{
                  backgroundImage: `url(/images/background/desktop/${bgName}-desktop.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                title={bgName}
              />
            ))}
          </div>
        </div>

        <div className="filters-actions">
          <button type="button" onClick={handleSave} className="btn-save">
            Save
          </button>
          <button type="button" onClick={onClose} className="btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

const HeaderDashboard = ({ title, onChangeBackground }) => {
  const { board } = useSelector(selectCurrentBoard);
  const [open, setOpen] = useState(false);

  return (
    <header className="header-dashboard">
      <h2>{board?.title || title || "My Board"}</h2>

      <button type="button" onClick={() => setOpen(true)} className="filters-btn">
        <span>🔍</span> <span>Filters</span>
      </button>

      {open && (
        <FiltersModal 
          bg={board?.background}
          onBgChange={onChangeBackground}
          onClose={() => setOpen(false)}
          board={board}
        />
      )}
    </header>
  );
};

export default HeaderDashboard;

