import React from "react";
import { IconList } from "./IconList/IconList";
import { CardList } from "./CardList/CardList";
import { AddCardButton } from "./AddCardButton/AddCardButton";
import { AddColumnButton } from "./AddColumnButton/AddColumnButton";
import { useEffect, useRef, useState } from "react";
import AddColumnModal from "../AddColumnModal/AddColumnModal";
import { AddCardModal } from "../AddCardModal/AddCardModal";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentBoard } from "../../redux/boards/selectors";
import { addColumn, deleteColumn } from "../../redux/columns/operations";
import { toast } from "react-toastify";
import { getBoardById, moveCard } from "../../redux/boards/operations";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import {
  BoardWrapper,
  ColumnList,
  ColumnItem,
  Wrapper,
  ColumnTitle,
  ColumnContainer,
} from "./Board.styled";

export const Board = () => {
  const [isModalColumnOpen, setIsModalColumnOpen] = useState(false);
  const [isModalCardOpen, setIsModalCardOpen] = useState(false);
  const [errorMessageSub, setErrorMessageSub] = useState(false);
  const [errUniqueTitle, setErrUniqueTitle] = useState(false);
  const [errShort, setErrShort] = useState(false);

  const [columnId, setColumnId] = useState();
  const [scrollable, setScrollable] = useState(false);
  const containerRef = useRef();
  const dispatch = useDispatch();

  const { board, columns = [] } = useSelector(selectCurrentBoard);
  const hasBoard = Boolean(board?._id);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      setScrollable(container.scrollLeft > 0);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleColumnModalOpen = () => {
    if (!hasBoard) return;
    setIsModalColumnOpen((prevState) => !prevState);
    setErrorMessageSub(false);
    setErrUniqueTitle(false);
  };

  const handleCardModalOpen = (id) => {
    setIsModalCardOpen((prevState) => !prevState);
    setColumnId(id);
  };

  const onSubmitColumnClick = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const title = form.elements.title.value.trim();

    const validTitle = title.length > 1;
    const uniqueTitle = columns.find(
      (item) =>
        (item.titleColumn ?? item.title ?? "").toLowerCase() ===
        title.toLowerCase()
    );

    if (uniqueTitle) setErrUniqueTitle(true);
    if (title.length === 0) setErrorMessageSub(true);
    if (title.length === 1) setErrShort(true);

    if (validTitle && !uniqueTitle && hasBoard) {
      await dispatch(
        addColumn({
          boardId: board._id,
          title,
        })
      );
      await dispatch(getBoardById(board._id));

      form.reset();
      handleColumnModalOpen();
      toast.success("You have successfully added the column!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleDelete = async (id) => {
    if (!board?._id) return;
    await dispatch(deleteColumn({ boardId: board._id, columnId: id }));
    await dispatch(getBoardById(board._id));
    toast.success("You have successfully deleted the column!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };

  function handleDragEnd(result) {
    const { draggableId, destination, source } = result;

    if (!destination || !board?._id) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const payload = {
      toColumnId: destination.droppableId,
      cardId: draggableId,
    };

    dispatch(moveCard(payload))
      .then(() => dispatch(getBoardById(board._id)))
      .catch((err) => {
        console.error("Error moving card:", err);
      });
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <BoardWrapper ref={containerRef} $scrollable={scrollable}>
        {columns?.length !== 0 && (
          <ColumnList>
            {columns?.map((column) => (
              <ColumnItem key={column._id}>
                <Droppable droppableId={column._id} type="group">
                  {(provided) => (
                    <ColumnContainer
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <Wrapper>
                        <ColumnTitle>
                          {column.titleColumn ?? column.title}
                        </ColumnTitle>
                        <IconList
                          columnID={column._id}
                          title={column.titleColumn ?? column.title}
                          handleDelete={handleDelete}
                        />
                      </Wrapper>
                      <CardList
                        currentColumn={column._id}
                        cardInfo={column.cards}
                        columnID={column._id}
                        placeholder={provided.placeholder}
                      />
                      <AddCardButton
                        handleCardModalOpen={handleCardModalOpen}
                        val={column._id}
                      />
                    </ColumnContainer>
                  )}
                </Droppable>
              </ColumnItem>
            ))}
          </ColumnList>
        )}
        <AddColumnButton onClick={handleColumnModalOpen} disabled={!hasBoard} />

        {isModalCardOpen && (
          <AddCardModal onClose={handleCardModalOpen} columnId={columnId} />
        )}
        {isModalColumnOpen && (
          <AddColumnModal
            errShort={errShort}
            setErrShort={setErrShort}
            setErrUniqueTitle={setErrUniqueTitle}
            errUniqueTitle={errUniqueTitle}
            setErrorMessageSub={setErrorMessageSub}
            errorMessageSub={errorMessageSub}
            openColumnModal={handleColumnModalOpen}
            onSubmitColumnClick={onSubmitColumnClick}
          />
        )}
      </BoardWrapper>
    </DragDropContext>
  );
};
