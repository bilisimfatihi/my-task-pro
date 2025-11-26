// frontend/src/components/layout/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { selectBoards } from '../../redux/boards/selectors';
import { fetchBoards, deleteBoard } from '../../redux/boards/operations';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import styles from './Sidebar.module.css';

import logo from '../../assets/images/favicon.svg';
import plant from '../../assets/images/sidebar/plant.png';
import plus from '../../assets/images/sidebar/plus.svg';
import logoutIcon from '../../assets/images/sidebar/logout.svg';
import NeedHelpModal from '../NeedHelpModal/NeedHelpModal';
import CreateBoardModal from '../AddBoardModal/CreateBoardModal';
import EditBoardModal from '../EditBoardModal/EditBoardModal';

const Sidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boards = useSelector(selectBoards);

  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingBoard, setEditingBoard] = useState(null);

  useEffect(() => {
    // Fetch boards on mount or when dispatch changes
    if (boards === undefined || boards === null) {
      dispatch(fetchBoards());
    }
  }, [dispatch, boards]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleDeleteBoard = async (e, boardId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this board?')) {
      await dispatch(deleteBoard(boardId));
      dispatch(fetchBoards());
    }
  };

  const handleEditBoard = (e, board) => {
    e.stopPropagation();
    setEditingBoard(board);
  };
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      {/* Logo */}
      <div className={styles.logoRow}>
        <img src={logo} className={styles.logoIcon} />
        <span className={styles.logoText}>Task Pro</span>
      </div>

      {/* My Boards */}
      <p className={styles.sectionTitle}>My boards</p>

      <button
        className={styles.createBoard}
        onClick={() => setIsCreateModalOpen(true)}
      >
        <img src={plus} alt="+" />
        Create a new board
      </button>

      {/* Board list */}
      <ul className={styles.boardList}>
        {boards && boards.length > 0 ? (
          boards.map((board) => (
            <li 
              key={board._id} 
              className={styles.boardItem}
            >
              <div 
                className={styles.boardContent}
                onClick={() => navigate(`/home/${board._id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/home/${board._id}`); }}
              >
                <span className={styles.boardIcon}>{board.icon || '📊'}</span>
                <span className={styles.boardName}>{board.title}</span>
              </div>
              <div className={styles.boardActions}>
                <button
                  className={styles.actionBtn}
                  onClick={(e) => handleEditBoard(e, board)}
                  title="Edit board"
                >
                  <FiEdit2 />
                </button>
                <button
                  className={styles.actionBtn}
                  onClick={(e) => handleDeleteBoard(e, board._id)}
                  title="Delete board"
                >
                  <FiTrash2 />
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className={styles.boardItem}>No boards yet</li>
        )}
      </ul>

      {/* Help Box */}
      <div className={styles.helpBox}>
        <img src={plant} className={styles.plant} />
        <p className={styles.helpText}>
          If you need help with TaskPro, check out our support resources or
          reach out to our customer support team.
        </p>
        <a onClick={() => setIsHelpModalOpen(true)} className={styles.helpLink}>
          ❓ Need help?
        </a>
      </div>

      {/* Logout */}
      <div
        className={styles.logout}
        role="button"
        tabIndex={0}
        onClick={handleLogout}
        onKeyDown={(e) => { if (e.key === 'Enter') handleLogout(); }}
      >
        <img src={logoutIcon} />
        <span>Log out</span>
      </div>
      {isCreateModalOpen && (
        <CreateBoardModal onClose={() => setIsCreateModalOpen(false)} />
      )}
      {isHelpModalOpen && (
        <NeedHelpModal
          isOpen={isHelpModalOpen}
          onClose={() => setIsHelpModalOpen(false)}
        />
      )}
      {editingBoard && (
        <EditBoardModal
          board={editingBoard}
          onClose={() => setEditingBoard(null)}
        />
      )}
    </aside>
    </>
  );
};

export default Sidebar;
