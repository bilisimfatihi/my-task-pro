// frontend/src/routes/AppRouter.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import WelcomePage from '../pages/Welcome/WelcomePage';

import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import NotFoundPage from '../pages/NotFound/NotFoundPage';

import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../components/layout/MainLayout';
import BoardPage from "../pages/Board/BoardPage";
import HomePage from "../pages/Home/HomePage";


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />

      <Route element={<AuthLayout />}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* SADECE BURADA MainLayout var */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/:boardId" element={<BoardPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
