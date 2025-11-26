import axios from './axios';
import { API_ROUTES } from '../constants/api';

//Tüm panoları getirir
export const getBoardsApi = async () => {
  const response = await axios.get(API_ROUTES.BOARDS);
  return response.data;
};

// Yeni Pano Oluşturur
export const createBoardApi = async (payload) => {
  const response = await axios.post(API_ROUTES.BOARDS, payload);
  return response.data;
};

//Tek Pano Getirir
export const getBoardByIdApi = async (boardId) => {
  const response = await axios.get(`${API_ROUTES.BOARDS}/${boardId}`);
  return response.data;
};

//Pano Güncelleme
export const updateBoardApi = async (boardId, payload) => {
  const response = await axios.put(`${API_ROUTES.BOARDS}/${boardId}`, payload);
  return response.data;
};

//Pano Silme
export const deleteBoardApi = async (boardId) => {
  const response = await axios.delete(`${API_ROUTES.BOARDS}/${boardId}`);
  return response.data;
};
