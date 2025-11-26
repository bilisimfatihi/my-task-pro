// frontend/src/pages/Home/HomePage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import { selectBoards } from "../../redux/boards/selectors";
import { fetchBoards } from "../../redux/boards/operations";
import { selectIsLoading } from "../../redux/boards/selectors";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boards = useSelector(selectBoards);
  const isLoading = useSelector(selectIsLoading);

  // Load boards list on entry
  useEffect(() => {
    if (!isLoading && !boards?.length) {
      dispatch(fetchBoards());
    }
  }, [boards?.length, dispatch, isLoading]);

  // Redirect to first board when available
  useEffect(() => {
    const firstBoardId = boards?.[0]?._id || boards?.[0]?.id;
    if (firstBoardId) {
      navigate(`/home/${firstBoardId}`, { replace: true });
    }
  }, [boards, navigate]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.boardIntro}>
        <p>
          Before starting your project, it is essential to create a board to
          visualize and track all the necessary tasks and milestones. This board
          serves as a powerful tool to organize the workflow and ensure
          effective collaboration among team members.
        </p>
        {!boards?.length && <p>Loading boards…</p>}
      </div>
    </div>
  );
};

export default HomePage;
