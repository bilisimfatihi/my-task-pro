import { createSlice } from "@reduxjs/toolkit";
import {
  addCard,
  deleteCard,
  editCard,
} from "./operations";

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCard.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCard.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(editCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCard.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default cardsSlice.reducer;
