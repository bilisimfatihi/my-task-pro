import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { boardsReducer } from './boards/boardSlice';
import columnsReducer from './columns/columnsSlice';
import cardsReducer from './cards/cardsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardsReducer,
    columns: columnsReducer,
    cards: cardsReducer,
  },
});

export default store;
