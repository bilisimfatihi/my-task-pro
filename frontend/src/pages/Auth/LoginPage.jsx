import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSchema } from '../../schemas/login.schema';
import { login } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginSchema.validate(form, { abortEarly: false });
      setErrors({});
      const result = await dispatch(login(form));

      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/home');
      }
    } catch (validationError) {
      const formErrors = {};

      validationError.inner?.forEach((err) => {
        formErrors[err.path] = err.message;
      });

      setErrors(formErrors);
    }
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Password</label>
          <div className={styles.passwordWrapper}>
            <input
              className={styles.input}
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.submit} type="submit" disabled={isLoading}>
          {isLoading ? 'Loading…' : 'LOG IN NOW'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
