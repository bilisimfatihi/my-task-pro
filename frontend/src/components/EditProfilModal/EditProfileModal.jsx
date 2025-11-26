import React from "react";
import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, reset } from '../../redux/slices/authSlice';
import { ThemeContext } from '../../contexts/ThemeContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Modal from '../Modal/Modal';
import Loader from '../Loader';
import './EditProfileModal.css';

const EditProfileModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { setTheme } = useContext(ThemeContext);
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
    theme: 'light',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const passwordRegex = /(?=.*[A-Za-z]).{8,}/;

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        avatar: user.avatar || '',
        theme: user.theme || 'light',
      });
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      console.log('EditProfileModal: Profile update successful');
      // Apply theme change immediately
      if (formData.theme && formData.theme !== user.theme) {
        setTheme(formData.theme);
      }
      // Close modal first, then reset after a delay to allow Header to re-render
      onClose();
      setTimeout(() => {
        dispatch(reset());
      }, 100);
    }
  }, [isSuccess, dispatch, onClose, formData.theme, user.theme, setTheme]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });

    // Apply theme change immediately for preview
    if (name === 'theme') {
      setTheme(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError('');
    
    console.log('=== SUBMIT DEBUG ===');
    console.log('Current user:', user);
    console.log('Form data:', formData);
    
    // client-side password validation (only when changing password)
    if (formData.password && !passwordRegex.test(formData.password)) {
      setLocalError('Password must contain at least one letter and be at least 8 characters');
      return;
    }

    // Only send fields that have changed
    const updates = {};
    if (formData.name !== user.name) updates.name = formData.name;
    if (formData.email !== user.email) updates.email = formData.email;
    if (formData.password) updates.password = formData.password;
    if (formData.avatar !== user.avatar) updates.avatar = formData.avatar;
    if (formData.theme !== user.theme) updates.theme = formData.theme;

    console.log('Updates to send:', updates);
    console.log('Number of updates:', Object.keys(updates).length);

    if (Object.keys(updates).length > 0) {
      console.log('Dispatching updateProfile...');
      dispatch(updateProfile(updates)).then((result) => {
        console.log('UpdateProfile result:', result);
        console.log('Result payload:', result.payload);
        console.log('Result payload.user:', result.payload?.user);
      });
    } else {
      console.log('No changes detected, closing modal');
      // No changes, just close the modal
      onClose();
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log('=== AVATAR UPLOAD DEBUG ===');
    console.log('File selected:', file.name, file.type, file.size);

    try {
      // Convert file to base64 for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Avatar = reader.result;
        console.log('Base64 avatar length:', base64Avatar.length);
        console.log('Base64 preview:', base64Avatar.substring(0, 100));
        // Only update local form state for preview
        setFormData(prev => {
          console.log('Previous avatar:', prev.avatar);
          console.log('New avatar (first 100 chars):', base64Avatar.substring(0, 100));
          return { ...prev, avatar: base64Avatar };
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error reading avatar file:', error);
      setLocalError('Failed to read avatar file. Please try again.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <form onSubmit={handleSubmit} className="edit-profile-form">
        {isError && <div className="error-message">{message}</div>}
        {localError && <div className="error-message">{localError}</div>}

        <div className="form-group">
          <label htmlFor="avatar">Profile Picture</label>
          <div className="avatar-upload">
            {formData.avatar && (
              <img
                src={formData.avatar}
                alt="Avatar"
                className="avatar-preview"
              />
            )}
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleAvatarUpload}
            />
            <button
              type="button"
              className="btn-upload"
              onClick={() => document.getElementById('avatar').click()}
            >
              {formData.avatar ? 'Change Picture' : 'Upload Picture'}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">New Password (leave blank to keep current)</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="theme">Theme</label>
          <select
            id="theme"
            name="theme"
            value={formData.theme}
            onChange={handleChange}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="violet">Violet</option>
          </select>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              console.log('Cancel button clicked');
              onClose();
            }}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
            onClick={() => console.log('Save Changes button clicked')}
          >
            {isLoading ? <Loader /> : 'Save Changes'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProfileModal;
