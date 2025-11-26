import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">Go back home</Link>
    </div>
  );
};

export default NotFoundPage;
