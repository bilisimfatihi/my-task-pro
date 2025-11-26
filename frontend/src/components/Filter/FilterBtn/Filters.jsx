import React, { useState } from "react";
import { Button, IconFilter } from "./Filters.styled";
import { ModalFilters } from "../ModalFilter/ModalFilters";
import { useSelector } from "react-redux";
import { selectCurrentBoard } from "../../../redux/boards/selectors";

export const FilterBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { board } = useSelector(selectCurrentBoard);
  const isActive = Boolean(board?._id);

  const toggleModal = () => {
    if (!isActive) return;
    setIsOpen((prev) => !prev);
  };
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {isOpen && isActive && <ModalFilters closeModal={closeModal} />}
      <Button
        $colorBg={board?.background}
        onClick={toggleModal}
        disabled={!isActive}
      >
        <IconFilter $colorBg={board?.background} />
        Filters
      </Button>
    </>
  );
};
