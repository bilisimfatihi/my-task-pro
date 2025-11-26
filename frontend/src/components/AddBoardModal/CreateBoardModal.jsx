import React, { useState } from 'react';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBoard, fetchBoards } from '../../redux/boards/operations';
import Modal from '../Modal/Modal';
import './CreateBoardModal.css';

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

const CreateBoardModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.boards.isLoading);
  const [title, setTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(icons[0]);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validate
      await schema.validate({ title }, { abortEarly: false });
      setErrors({});

      // Create board
      const payload = {
        title: title.trim(),
        icon: selectedIcon,
        background: selectedBackground,
      };

      const result = await dispatch(addBoard(payload));
      
      if (addBoard.fulfilled.match(result)) {
        const newBoard = result.payload;
        const newBoardId = newBoard?._id || newBoard?.id;
        
        if (!newBoardId) {
          console.error('Board created but no ID found:', newBoard);
          setErrors({ submit: 'Board created but ID not found' });
          return;
        }
        
        // Refetch boards to ensure Sidebar gets updated list
        await dispatch(fetchBoards());
        
        onClose();
        navigate(`/home/${newBoardId}`);
      } else {
        throw new Error(result.payload || 'Failed to create board');
      }
    } catch (error) {
      if (error.inner) {
        const errorObj = {};
        error.inner.forEach((err) => {
          errorObj[err.path] = err.message;
        });
        setErrors(errorObj);
      } else {
        console.error('Pano oluşturulamadı:', error);
        setErrors({ submit: 'Failed to create board' });
      }
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="New board">
      <form className="create-board-form" onSubmit={onSubmit}>
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

        <button type="submit" className="btn-create">
          <span>+</span> Create
        </button>
      </form>
    </Modal>
  );
};

export default CreateBoardModal;
