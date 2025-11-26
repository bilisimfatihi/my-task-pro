import api from './axios';

export const createCard = (columnId, data) =>
  api.post('/api/cards', { ...data, columnId });

export const updateCard = (cardId, data) =>
  api.patch(`/api/cards/${cardId}`, data);

export const deleteCard = (cardId) => api.delete(`/api/cards/${cardId}`);

export const getCardsByColumn = (columnId) =>
  api.get(`/api/columns/${columnId}/cards`);
