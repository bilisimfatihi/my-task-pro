import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBoards,
  addBoard,
  deleteBoard,
  getBoardById,
  editBoardById,
  moveCard,
  boardFilter,
} from "./operations";

const initialCurrent = {
  board: null,
  columns: [],
};

const normalizeBoardPayload = (payload, fallbackFilter = "default") => {
  if (!payload) {
    return { ...initialCurrent };
  }

  // Backend direkt board objesini döndürüyor: { _id, title, columns: [...] }
  // Biz { board: {...}, columns: [...] } formatına çeviriyoruz
  const boardData = payload.board ? payload.board : payload;
  const columns = payload.columns || boardData.columns || [];

  const nextFilter = boardData.filter ?? fallbackFilter ?? "default";

  return {
    board: { ...boardData, filter: nextFilter },
    columns,
  };
};

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    boards: {
      current: { ...initialCurrent },
      items: [],
      isLoading: false,
      error: null,
    },
  },
  reducers: {
    setFilter(state, action) {
      if (state.boards.current?.board) {
        state.boards.current.board.filter = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.boards.isLoading = true;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.boards.isLoading = false;
        state.boards.error = null;
        state.boards.items = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.boards.isLoading = false;
        state.boards.error = action.payload;
      })
      .addCase(addBoard.pending, (state) => {
        state.boards.isLoading = true;
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.boards.isLoading = false;
        state.boards.error = null;
        state.boards.items.push(action.payload);
      })
      .addCase(addBoard.rejected, (state, action) => {
        state.boards.isLoading = false;
        state.boards.error = action.payload;
      })
      .addCase(getBoardById.pending, (state) => {
        state.boards.isLoading = true;
      })
      .addCase(getBoardById.fulfilled, (state, action) => {
        state.boards.isLoading = false;
        state.boards.error = null;
        const prevFilter =
          state.boards.current.board?._id === action.payload?.board?._id
            ? state.boards.current.board?.filter || "default"
            : "default";
        state.boards.current = normalizeBoardPayload(
          action.payload,
          prevFilter
        );
      })
      .addCase(getBoardById.rejected, (state, action) => {
        state.boards.isLoading = false;
        state.boards.error = action.payload;
      })
      .addCase(editBoardById.pending, (state) => {
        state.boards.isLoading = true;
      })
      .addCase(editBoardById.fulfilled, (state, action) => {
        state.boards.isLoading = false;
        state.boards.error = null;

        state.boards.items = state.boards.items.map((board) =>
          board._id === action.payload._id
            ? { ...board, ...action.payload }
            : board
        );

        if (state.boards.current.board?._id === action.payload._id) {
          state.boards.current.board = {
            ...state.boards.current.board,
            ...action.payload,
          };
        }
      })
      .addCase(editBoardById.rejected, (state, action) => {
        state.boards.isLoading = false;
        state.boards.error = action.payload;
      })
      .addCase(moveCard.pending, (state) => {
        state.boards.isLoading = true;
      })
      .addCase(moveCard.fulfilled, (state) => {
        state.boards.isLoading = false;
        state.boards.error = null;
      })
      .addCase(moveCard.rejected, (state, action) => {
        state.boards.isLoading = false;
        state.boards.error = action.payload;
      })
      .addCase(deleteBoard.pending, (state) => {
        state.boards.isLoading = true;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.boards.isLoading = false;
        state.boards.error = null;

        const deletedId = action.payload.id || action.payload._id;

        state.boards.items = state.boards.items.filter(
          (board) => board._id !== deletedId
        );
        if (state.boards.current.board?._id === deletedId) {
          state.boards.current = { ...initialCurrent };
        }
      })

      .addCase(deleteBoard.rejected, (state, action) => {
        state.boards.isLoading = false;
        state.boards.error = action.payload;
      })
      .addCase(boardFilter.fulfilled, (state, action) => {
        if (state.boards.current.board) {
          const nextFilter =
            action.payload ?? action.meta?.arg?.filter ?? "default";
          state.boards.current.board.filter = nextFilter;
        }
      })
      .addCase(boardFilter.rejected, () => {});
  },
});

export const boardsReducer = boardsSlice.reducer;
export const { setFilter } = boardsSlice.actions;
