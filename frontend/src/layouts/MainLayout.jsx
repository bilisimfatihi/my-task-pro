import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import styles from './MainLayout.module.css';

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className={styles.app}>
      <Header onMenuClick={toggleSidebar} />
      <div className={styles.body}>
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
