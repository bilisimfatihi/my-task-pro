import React, { useContext, useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './Header.module.css';
import { ThemeContext } from '../../contexts/ThemeContext';

import logo from '../../assets/images/favicon.svg';
import avatarPlaceholder from '../../assets/images/avatar.png';
import EditProfileModal from '../EditProfilModal/EditProfileModal';

const Header = ({ onMenuClick }) => {
  const { theme, setTheme, toggleTheme } = useContext(ThemeContext);
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarKey, setAvatarKey] = useState(Date.now());

  // Debug: Log user changes
  useEffect(() => {
    console.log('Header (layout): User object changed:', user);
  }, [user]);

  // Force re-render when user avatar changes
  useEffect(() => {
    if (user?.avatar) {
      console.log('Header (layout): User avatar changed to:', user.avatar);
      setAvatarKey(Date.now());
    }
  }, [user?.avatar]);

  const cycleTheme = useMemo(() => {
    const order = ['light', 'dark', 'violet'];
    return () => {
      const next = order[(order.indexOf(theme) + 1) % order.length] || 'light';
      setTheme ? setTheme(next) : toggleTheme();
    };
  }, [setTheme, theme, toggleTheme]);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {/* Hamburger Menu for Mobile */}
        <button className={styles.hamburger} onClick={onMenuClick} aria-label="Toggle menu">
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
        
        <img src={logo} alt="app logo" className={styles.logo} />
        <h1 className={styles.title}>Task Pro</h1>
      </div>

      <div className={styles.right}>
        <button className={styles.themeBtn} onClick={cycleTheme}>
          <span className={styles.themeIcon}>
            {theme === 'light' && '🌞'}
            {theme === 'dark' && '🌙'}
            {theme === 'violet' && '🟣'}
          </span>
          <span className={styles.themeLabel}>
            {theme === 'light' && 'Light'}
            {theme === 'dark' && 'Dark'}
            {theme === 'violet' && 'Violet'}
          </span>
        </button>
        <div className={styles.userInfo} onClick={() => setIsModalOpen(true)}>
          <span className={styles.userName}>{user?.name || 'User'}</span>
          <img 
            key={avatarKey}
            src={user?.avatar ? `${user.avatar}?t=${avatarKey}` : avatarPlaceholder} 
            alt="user avatar" 
            className={styles.avatar}
            onError={(e) => {
              e.target.src = avatarPlaceholder;
            }}
          />
        </div>
      </div>
      {isModalOpen && (
        <EditProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
