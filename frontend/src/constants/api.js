export const API_BASE_URL = 'http://localhost:3000/api';

export const API_ROUTES = {
  // Auth endpoints
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  CURRENT_USER: '/auth/current',
  UPDATE_PROFILE: '/auth/profile',

  // Board endpoints
  BOARDS: '/boards',
  BOARD_BY_ID: (id) => `/boards/${id}`,

  // Column endpoints
  COLUMNS: '/columns',
  COLUMN_BY_ID: (id) => `/columns/${id}`,

  // Card endpoints
  CARDS: '/cards',
  CARD_BY_ID: (id) => `/cards/${id}`,
};
