import React, { useState } from 'react';
import * as yup from 'yup';
import { sendHelpRequest } from '../../api/help.api';
import Modal from '../Modal/Modal';
import './NeedHelpModal.css';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Geçerli bir email adresi girin')
    .required('Email adresi gereklidir'),
  comment: yup
    .string()
    .min(10, 'Yorum en az 10 karakter olmalıdır')
    .required('Yorum gereklidir'),
});

const NeedHelpModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    try {
      // Validate
      await schema.validate({ email, comment }, { abortEarly: false });
      setErrors({});
      setIsLoading(true);

      // Send help request
      await sendHelpRequest(email, comment);

      setSuccessMessage('E-posta başarıyla gönderildi! Teşekkür ederiz.');
      setEmail('');
      setComment('');

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setSuccessMessage('');
      }, 2000);
    } catch (error) {
      if (error.inner) {
        const errorObj = {};
        error.inner.forEach((err) => {
          errorObj[err.path] = err.message;
        });
        setErrors(errorObj);
      } else {
        console.error('E-posta gönderilemedi:', error);
        const errorMessage = error.response?.data?.message || error.message || 'E-posta gönderilemedi. Lütfen tekrar deneyin.';
        setErrors({ submit: errorMessage });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Need help">
      <form className="need-help-form" onSubmit={onSubmit}>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <div className="form-group">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <textarea
            placeholder="Comment"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {errors.comment && <p className="error">{errors.comment}</p>}
        </div>

        {errors.submit && (
          <div className="error-message">{errors.submit}</div>
        )}

        <button type="submit" className="btn-send" disabled={isLoading}>
          {isLoading ? 'Gönderiliyor...' : 'Send'}
        </button>
      </form>
    </Modal>
  );
};

export default NeedHelpModal;
