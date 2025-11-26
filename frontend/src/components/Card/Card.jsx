import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { CardIconsList } from "./CardIconsList/CardIconsList";
import {
  CardItem,
  Container,
  Title,
  Description,
  Line,
  UnderlineInfo,
  PriorityWrapp,
  Subtitle,
  Wrapper,
  PriorityColor,
  PriorityText,
  DeadlineWrapp,
  Date,
} from "./Card.styled";

// eslint-disable-next-line react/prop-types
export const Card = ({ cardInfo, currentColumn }) => {
  const {
    titleCard,
    title,
    description = "",
    priority,
    deadline,
  } = cardInfo;

  const [formattedDate, setFormattedDate] = useState("");
  const priorityValue = priority === "none" ? "without" : priority ?? "without";

  useEffect(() => {
    if (!deadline) {
      setFormattedDate("No deadline");
      return;
    }
    const date = dayjs(deadline);
    const outputDate = date.format("DD/MM/YYYY");
    setFormattedDate(outputDate);
  }, [deadline]);

  return (
    <CardItem value={priorityValue}>
      <Container>
        <Title>{titleCard ?? title ?? "Untitled card"}</Title>
        <Description>
          <ReactReadMoreReadLess charLimit={75} readMoreText={""}>
            {description}
          </ReactReadMoreReadLess>
        </Description>
        <Line />
        <UnderlineInfo>
          <PriorityWrapp>
            <Subtitle>Priority</Subtitle>
            <Wrapper>
              <PriorityColor value={priorityValue} />
              <PriorityText>{priorityValue}</PriorityText>
            </Wrapper>
          </PriorityWrapp>
          <DeadlineWrapp>
            <Subtitle>Deadline</Subtitle>
            <Date>{formattedDate}</Date>
          </DeadlineWrapp>
          <CardIconsList currentColumn={currentColumn} cardInfo={cardInfo} />
        </UnderlineInfo>
      </Container>
    </CardItem>
  );
};

Card.propTypes = {
  cardInfo: PropTypes.object,
  currentColumn: PropTypes.string,
  columnsInfo: PropTypes.array,
};
