import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

export const editColumn = createAsyncThunk(
  "columns/editColumn",
  async ({ boardId, columnId, title }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/columns/${columnId}`, {
        titleColumn: title,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  "columns/deleteColumn",
  async ({ boardId, columnId }, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/columns/${columnId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addColumn = createAsyncThunk(
  "columns/addColumn",
  async ({ boardId, title }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/columns`, {
        boardId,
        title,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
