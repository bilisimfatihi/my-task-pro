import api from './axios';

export const register = async (payload) => {
  const res = await api.post('/auth/register', payload);
  return res.data;
};

export const login = async (payload) => {
  const res = await api.post('/auth/login', payload);
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await api.get('/auth/current');
  return res.data;
};

export const updateProfile = async (payload) => {
  const res = await api.put('/auth/profile', payload);
  return res.data;
};

export const logout = async () => {
  const res = await api.post('/auth/logout');
  return res.data;
};
