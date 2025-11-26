import { createSlice } from "@reduxjs/toolkit";
import {
  addColumn,
  deleteColumn,
  editColumn,
} from "./operations";

const columnsSlice = createSlice({
  name: "columns",
  initialState: {
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addColumn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addColumn.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editColumn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editColumn.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(editColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteColumn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteColumn.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default columnsSlice.reducer;
