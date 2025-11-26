import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Board } from "../../components/Board/Board";
import { HeaderDashboard } from "../../components/HeaderDashboard/HeaderDashboard";
import Loader from "../../components/Loader";
import { MainWrapper, MainDashboard } from "../../components/MainPage/MainPage.styled.jsx";
import { selectBoards, selectCurrentBoard, selectIsLoading } from "../../redux/boards/selectors";
import { fetchBoards, getBoardById } from "../../redux/boards/operations";

const BoardPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { boardId } = useParams();

  const boards = useSelector(selectBoards);
  const { board } = useSelector(selectCurrentBoard);
  const isLoading = useSelector(selectIsLoading);

  // Load boards list so we can redirect to first board when there's no :boardId
  useEffect(() => {
    if (!boards?.length) {
      dispatch(fetchBoards());
    }
  }, [boards?.length, dispatch]);

  // If user hits /home without id, send them to their first board
  useEffect(() => {
    if (!boardId && boards?.length) {
      navigate(`/home/${boards[0]._id}`);
    }
  }, [boardId, boards, navigate]);

  // If URL has a boardId that doesn't exist (404), fall back to first board
  useEffect(() => {
    if (boardId && boards?.length) {
      const exists = boards.some((b) => b._id === boardId);
      if (!exists) {
        navigate("/home", { replace: true });
      }
    }
  }, [boardId, boards, navigate]);

  useEffect(() => {
    if (boardId) {
      dispatch(getBoardById(boardId));
    }
  }, [boardId, dispatch]);

  return (
    <MainWrapper
      $background={board ? board.background : "default"}
      $loc={location.pathname}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <HeaderDashboard />
          <MainDashboard>
            <Board />
          </MainDashboard>
        </>
      )}
    </MainWrapper>
  );
};

export default BoardPage;
