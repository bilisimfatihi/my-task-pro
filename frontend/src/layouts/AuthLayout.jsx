
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';

const AuthLayout = () => {
  return (
    <div className={styles.page}>
      <div className={styles.phoneShadow}>
        <div className={styles.card}>
          {/* ÜST TABS */}
          <div className={styles.tabs}>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? `${styles.tab} ${styles.active}` : styles.tab
              }
            >
              Registration
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? `${styles.tab} ${styles.active}` : styles.tab
              }
            >
              Log In
            </NavLink>
          </div>

          {/* FORM BURAYA GELİYOR */}
          <div className={styles.content}><Outlet /></div>
        </div>
      </div>

      <p className={styles.footer}>© TaskPro 2025</p>
    </div>
  );
};

export default AuthLayout;
