import React from 'react';
import { Link } from 'react-router-dom';
import styles from './WelcomePage.module.css';
import welcomeDesk from '../../assets/images/welcome/welcome-desk-2x.png';
import iconLightning from '../../assets/images/welcome/icon.png';

const WelcomePage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <img src={welcomeDesk} alt="Task Pro" className={styles.deskImage} />

        <div className={styles.titleWrapper}>
          <img src={iconLightning} alt="Task Pro icon" className={styles.logoIcon} />
          <h1 className={styles.title}>Task Pro</h1>
        </div>

        <p className={styles.subtitle}>
          Supercharge your productivity and take control of your tasks with Task
          Pro – Don’t wait, start achieving your goals now!
        </p>

        <div className={styles.buttons}>
          <Link to="/register" className={`${styles.btn} ${styles.primary}`}>
            Registration
          </Link>
          <Link to="/login" className={`${styles.btn} ${styles.secondary}`}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
