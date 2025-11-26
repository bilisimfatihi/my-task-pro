import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentBoard } from "../../redux/boards/selectors";
import { FilterBtn } from "../Filter/FilterBtn/Filters";
import { HeaderDashboardWrapper, BoardTitle } from "./HeaderDashboard.styled";

export const HeaderDashboard = () => {
  const { board } = useSelector(selectCurrentBoard);
  const boardTitle = board?.titleBoard ?? board?.title ?? "Project Office";
  const background = board?.background ?? "default";

  return (
    <HeaderDashboardWrapper>
      <BoardTitle $colorBg={background}>{boardTitle}</BoardTitle>
      <FilterBtn />
    </HeaderDashboardWrapper>
  );
};
