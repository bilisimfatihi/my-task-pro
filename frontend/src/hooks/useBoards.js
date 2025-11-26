import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchBoards,
  fetchBoardById,
  createBoard,
  updateBoard,
  removeBoard,
  clearCurrentBoard,
} from '../redux/slices/boardSlice';

import {
  selectBoards,
  selectCurrentBoard,
  selectBoardsLoading,
  selectBoardsError,
} from '../redux/selectors/boardSelectors';

const useBoards = () => {
  const dispatch = useDispatch();

  const boards = useSelector(selectBoards);
  const currentBoard = useSelector(selectCurrentBoard);
  const isLoading = useSelector(selectBoardsLoading);
  const error = useSelector(selectBoardsError);

  const loadBoards = useCallback(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const loadBoardById = useCallback(
    (boardId) => {
      if (!boardId) return;
      dispatch(fetchBoardById(boardId));
    },
    [dispatch]
  );

  //yeni pano oluşturur
  const addBoard = useCallback(
    (payload) => {
      dispatch(createBoard(payload));
    },
    [dispatch]
  );

  //var olan panoyu güncelleme
  const editBoard = useCallback(
    (boardId, payload) => {
      dispatch(updateBoard({ boardId, payload }));
    },
    [dispatch]
  );

  //Panoyu silme
  const deleteBoard = useCallback(
    (boardId) => {
      dispatch(removeBoard(boardId));
    },
    [dispatch]
  );

  //Seçili panoyu temizler (sayfadan çıkarırken vs.)
  const resetCurrentBoard = useCallback(() => {
    dispatch(clearCurrentBoard());
  }, [dispatch]);

  //Dışarıya veren çıktılar
  return {
    boards,
    currentBoard,
    isLoading,
    error,
    loadBoards,
    loadBoardById,
    addBoard,
    editBoard,
    deleteBoard,
    resetCurrentBoard,
  };
};
export default useBoards;
