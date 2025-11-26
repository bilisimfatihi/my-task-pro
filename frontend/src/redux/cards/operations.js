import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';

export const addCard = createAsyncThunk(
  'cards/addCard',
  async (card, thunkAPI) => {
    try {
      const { boardId, columnId, ...cardData } = card;
      const response = await axiosInstance.post(`/cards`, {
        columnId,
        title: cardData.title,
        description: cardData.description,
        priority: cardData.priority,
        deadline: cardData.deadline,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const editCard = createAsyncThunk(
  'cards/editCard',
  async ({ boardId, columnId, cardId, newCardData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/cards/${cardId}`, {
        title: newCardData.title,
        description: newCardData.description,
        priority: newCardData.priority,
        deadline: newCardData.deadline,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteCard = createAsyncThunk(
  'cards/deleteCard',
  async ({ boardId, columnId, cardId }, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/cards/${cardId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
