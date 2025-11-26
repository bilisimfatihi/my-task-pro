import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { editBoardById, fetchBoards } from '../../redux/boards/operations';
import Modal from '../Modal/Modal';
import './EditBoardModal.css';

const schema = yup.object().shape({
  title: yup.string().required('Başlık gereklidir'),
});

const icons = ['📊', '📋', '📝', '🎯', '✅', '🚀', '💼', '⭐'];
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

const EditBoardModal = ({ board, onClose }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.boards.isLoading);
  const [title, setTitle] = useState(board.title || '');
  const [selectedIcon, setSelectedIcon] = useState(board.icon || icons[0]);
  const [selectedBackground, setSelectedBackground] = useState(board.background || null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (board) {
      setTitle(board.title || '');
      setSelectedIcon(board.icon || icons[0]);
      setSelectedBackground(board.background || null);
    }
  }, [board]);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await schema.validate({ title }, { abortEarly: false });
      setErrors({});

      const payload = {
        title: title.trim(),
        icon: selectedIcon,
        background: selectedBackground,
      };

      const result = await dispatch(editBoardById({ 
        boardId: board._id, 
        updatedData: payload 
      }));
      
      if (editBoardById.fulfilled.match(result)) {
        await dispatch(fetchBoards());
        onClose();
      } else {
        throw new Error(result.payload || 'Failed to update board');
      }
    } catch (error) {
      if (error.inner) {
        const errorObj = {};
        error.inner.forEach((err) => {
          errorObj[err.path] = err.message;
        });
        setErrors(errorObj);
      } else {
        console.error('Pano güncellenemedi:', error);
        setErrors({ submit: 'Failed to update board' });
      }
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Edit board">
      <form className="edit-board-form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Board title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>

        <div className="form-section">
          <label>Icons</label>
          <div className="icons-grid">
            {icons.map((icon) => (
              <button
                key={icon}
                type="button"
                className={`icon-btn ${selectedIcon === icon ? 'active' : ''}`}
                onClick={() => setSelectedIcon(icon)}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label>Background</label>
          <div className="backgrounds-grid">
            <button
              type="button"
              className={`bg-btn ${selectedBackground === null ? 'active' : ''}`}
              onClick={() => setSelectedBackground(null)}
            >
              None
            </button>
            {backgroundNames.map((bg) => (
              <button
                key={bg}
                type="button"
                className={`bg-btn ${selectedBackground === bg ? 'active' : ''}`}
                onClick={() => setSelectedBackground(bg)}
                style={{ backgroundImage: `url(/images/background/desktop/${bg}-desktop.jpg)` }}
              />
            ))}
          </div>
        </div>

        <button type="submit" className="btn-update" disabled={isLoading}>
          <span>✓</span> Update
        </button>
      </form>
    </Modal>
  );
};

export default EditBoardModal;
