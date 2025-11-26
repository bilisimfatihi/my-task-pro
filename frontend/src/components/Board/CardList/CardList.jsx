import React from "react";
import PropTypes from "prop-types";
import { Card } from "../../Card/Card";
import { List } from "./CardList.styled";
import { Draggable } from "react-beautiful-dnd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentBoard } from "../../../redux/boards/selectors";

export const CardList = ({ currentColumn, cardInfo = [], placeholder }) => {
  const [scrollable, setScrollable] = useState(false);
  const containerRef = useRef();

  const { board } = useSelector(selectCurrentBoard);

  const normalizePriority = (value) => {
    if (value === "none") return "without";
    return value ?? "without";
  };

  const currentFilter = board?.filter ?? "default";

  const renderCard =
    currentFilter === "default"
      ? cardInfo
      : cardInfo.filter(
        (card) => normalizePriority(card.priority) === currentFilter
      );

  const sortedCards = [...renderCard].sort((a, b) => {
    if (!a.deadline && !b.deadline) return 0;
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;

    return new Date(a.deadline) - new Date(b.deadline);
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      setScrollable(container.scrollTop > 0);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <List ref={containerRef} $scrollable={scrollable}>
      {sortedCards.map((card, index) => (
        <li key={card._id}>
          <Draggable draggableId={card._id} index={index}>
            {(provided) => (
              <div
                {...provided.dragHandleProps}
                {...provided.draggableProps}
                ref={provided.innerRef}
              >
                <Card
                  currentColumn={currentColumn}
                  cardInfo={card}
                  index={index}
                />
              </div>
            )}
          </Draggable>
        </li>
      ))}
      {placeholder}
    </List>
  );
};

CardList.propTypes = {
  currentColumn: PropTypes.string,
  cardInfo: PropTypes.array,
  placeholder: PropTypes.node,
};
