import api from './axios';

export const getColumnsByBoard = (boardId) =>
  api.get(`/api/boards/${boardId}/columns`);

export const createColumn = (boardId, data) =>
  api.post('/api/columns', { ...data, boardId });

export const updateColumn = (columnId, data) =>
  api.patch(`/api/columns/${columnId}`, data);

export const deleteColumn = (columnId) =>
  api.delete(`/api/columns/${columnId}`);
