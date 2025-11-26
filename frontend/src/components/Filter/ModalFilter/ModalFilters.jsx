import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../../redux/boards/boardSlice";
import { selectCurrentBoard } from "../../../redux/boards/selectors";
import { boardFilter } from "../../../redux/boards/operations";
import {
  Modal,
  BackDrop,
  CloseBtn,
  CloseIcon,
  StyledTitle,
  StyledWrapper,
  Box,
  Text,
  Btn,
  List,
  Item,
  RadioInput,
  Label,
  Radio,
  CheckedRadioUp,
  CheckedRadioIn,
  Span,
  CheckedSpan,
} from "./ModalFilter.styled";

export const ModalFilters = ({ closeModal }) => {
  const { board } = useSelector(selectCurrentBoard);
  const normalizeFilter = (value) => value ?? "default";

  const [checkPriority, setCheckPriority] = useState(
    normalizeFilter(board?.filter)
  );
  const dispatch = useDispatch();

  const handleFilter = async (filter) => {
    setCheckPriority(filter);
    dispatch(setFilter(filter));
    if (board?._id) {
      try {
        await dispatch(boardFilter({ boardId: board._id, filter })).unwrap();
      } catch (err) {
        // ignore API errors; keep client-side selection
      }
    }
    closeModal();
  };
  const isCheck = (e) => {
    setCheckPriority(e.target.value);
  };
  useEffect(() => {
    setCheckPriority(normalizeFilter(board?.filter));
  }, [board?.filter]);

  useEffect(() => {
    const handleKeyDown = (evt) => {
      if (evt.code === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [closeModal]);

  return createPortal(
    <BackDrop
      id="backdrop"
      onClick={(e) => {
        if (e.target.id === "backdrop") {
          closeModal();
        }
      }}
    >
      <Modal>
        <CloseBtn onClick={() => closeModal()}>
          <CloseIcon />
        </CloseBtn>
        <StyledTitle>Filters</StyledTitle>
        <StyledWrapper>
          <Box>
            <Text>Label color</Text>
            <Btn
              onClick={() => {
                handleFilter("default");
              }}
            >
              Show all
            </Btn>
          </Box>
          <List>
            <Item>
              <Label onClick={() => handleFilter("without")}>
                <RadioInput
                  onChange={isCheck}
                  type="radio"
                  name="priority"
                  value="without"
                />
                {checkPriority === "without" ? (
                  <CheckedRadioUp $priority={"without"}>
                    <CheckedRadioIn $priority={"without"} />
                  </CheckedRadioUp>
                ) : (
                  <Radio $priority={"without"} />
                )}
                {checkPriority !== "without" ? (
                  <Span>Without priority</Span>
                ) : (
                  <CheckedSpan>Without priority</CheckedSpan>
                )}
              </Label>
            </Item>
            <Item>
              <Label onClick={() => handleFilter("low")}>
                <RadioInput
                  onChange={isCheck}
                  type="radio"
                  name="priority"
                  value="low"
                />
                {checkPriority === "low" ? (
                  <CheckedRadioUp $priority={"low"}>
                    <CheckedRadioIn $priority={"low"} />
                  </CheckedRadioUp>
                ) : (
                  <Radio $priority={"low"} />
                )}
                {checkPriority !== "low" ? (
                  <Span>Low</Span>
                ) : (
                  <CheckedSpan>Low</CheckedSpan>
                )}
              </Label>
            </Item>
            <Item>
              <Label onClick={() => handleFilter("medium")}>
                <RadioInput
                  onChange={isCheck}
                  type="radio"
                  name="priority"
                  value="medium"
                />
                {checkPriority === "medium" ? (
                  <CheckedRadioUp $priority={"medium"}>
                    <CheckedRadioIn $priority={"medium"} />
                  </CheckedRadioUp>
                ) : (
                  <Radio $priority={"medium"} />
                )}
                {checkPriority !== "medium" ? (
                  <Span>Medium</Span>
                ) : (
                  <CheckedSpan>Medium</CheckedSpan>
                )}
              </Label>
            </Item>
            <Item>
              <Label onClick={() => handleFilter("high")}>
                <RadioInput
                  onChange={isCheck}
                  type="radio"
                  name="priority"
                  value="high"
                />
                {checkPriority === "high" ? (
                  <CheckedRadioUp $priority={"high"}>
                    <CheckedRadioIn $priority={"high"} />
                  </CheckedRadioUp>
                ) : (
                  <Radio $priority={"high"} />
                )}
                {checkPriority !== "high" ? (
                  <Span>High</Span>
                ) : (
                  <CheckedSpan>High</CheckedSpan>
                )}
              </Label>
            </Item>
          </List>
        </StyledWrapper>
      </Modal>
    </BackDrop>,
    document.getElementById("modal-root")
  );
};

ModalFilters.propTypes = {
  closeModal: PropTypes.func,
};
