import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

// Tüm board'ları getirir
export const fetchBoards = createAsyncThunk(
  "boards/fetchBoards",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/boards`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Yeni board ekler
export const addBoard = createAsyncThunk(
  "boards/addBoard",
  async (board, thunkAPI) => {
    try {
      const payload = {
        title: board.title || board.titleBoard || "New board",
        background: board.background ?? null,
        icon: board.icon ?? "default",
        filter: board.filter ?? "default",
      };
      const response = await axiosInstance.post(`/boards`, payload);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Tek board getirir
export const getBoardById = createAsyncThunk(
  "boards/getBoardById",
  async (boardId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/boards/${boardId}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Board'u günceller
export const editBoardById = createAsyncThunk(
  "boards/editBoardById",
  async ({ boardId, updatedData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/boards/${boardId}`, updatedData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Board'u siler
export const deleteBoard = createAsyncThunk(
  "boards/deleteBoard",
  async (boardId, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/boards/${boardId}`);
      return { id: boardId, message: response.data.message };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Board filtresi değiştirir
export const boardFilter = createAsyncThunk(
  "boards/boardFilter",
  async ({ boardId, filter }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/boards/${boardId}`, { filter });
      return response.data.filter ?? filter;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Kart taşıma (Move card)
export const moveCard = createAsyncThunk(
  "boards/moveCard",
  async ({ toColumnId, cardId }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/cards/${cardId}`, {
        columnId: toColumnId,
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Yeni column ekler
export const addColumn = createAsyncThunk(
  "boards/addColumn",
  async ({ boardId, title }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/boards/${boardId}/columns`, { title });
      return { boardId, column: response.data };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Column siler
export const deleteColumn = createAsyncThunk(
  "boards/deleteColumn",
  async ({ boardId, columnId }, thunkAPI) => {
    try {
      await axiosInstance.delete(`/boards/${boardId}/columns/${columnId}`);
      return { boardId, columnId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
