import React from "react";
import PropTypes from "prop-types";
import {
  AddBtn,
  IconWrapper,
  Svg,
  BtnTextWrapp,
} from "./AddColumnButton.styled";

export const AddColumnButton = ({ onClick, disabled }) => {
  return (
    <AddBtn type="button" onClick={onClick} disabled={disabled}>
      <IconWrapper>
        <Svg />
      </IconWrapper>
      <BtnTextWrapp>Add another column</BtnTextWrapp>
    </AddBtn>
  );
};

AddColumnButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
