import React from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";

export const AddModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${(p) => p.theme.colors.modalBgColor};
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledAddModal = styled.div`
  position: relative;
  padding: 24px;
  width: 100%;
  max-width: 350px;
  min-height: 221px;
  background-color: ${(p) => p.theme.colors.modalWindowsBgColor};
  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.colors.modalBorderColorLowOp};
  box-shadow: 0 4px 16px 0 rgba(22, 22, 22, 0.08);
  
  @media screen and (min-width: 320px) and (max-width: 375px) {
    width: 90%;
  }
`;

export const AddColumnModalBtn = styled.span`
  position: absolute;
  top: 14px;
  right: 14px;
  cursor: pointer;
`;

export const AddColumnTitle = styled.h2`
  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.02em;
  color: ${(p) => p.theme.colors.secondaryTextColor};
  margin-bottom: 24px;
`;

export const AddColumnForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const AddColumnInput = styled.input`
  width: 100%;
  height: 49px;
  font-size: 14px;
  letter-spacing: -0.02em;
  color: ${(p) => p.theme.colors.secondaryTextColor};
  background-color: ${(p) => p.theme.colors.themeWrapper};
  padding: 14px 18px;
  border-radius: 8px;
  border: 1px solid
    ${(p) =>
      p?.$isError ? p.theme.colors.errorColor : p.theme.colors.accentTextColor};
  outline: none;
  margin-bottom: 24px;
  box-shadow: 0 4px 16px 0 rgba(22, 22, 22, 0.08);
  opacity: ${(p) => (p?.$isError ? 1 : 0.4)};
  transition: opacity var(--primary-transition);

  &:focus {
    opacity: 1;
  }

  &::placeholder {
    color: ${(p) => p.theme.colors.mainPageTextColor};
    opacity: 0.6;
  }
`;

export const CloseAddColumnModal = styled(IoClose)`
  font-size: 2.4rem;
  color: ${(p) => p.theme.colors.secondaryTextColor};
  position: absolute;
  right: 0;

  transition: all var(--primary-transition);

  &:hover {
    transform: rotate(90deg);
    color: ${(p) => p.theme.colors.accentTextColor};
  }
`;

export const ErrorMessage = styled.p`
  position: absolute;
  right: 0;
  top: -24px;
  color: ${(p) => p.theme.colors.errorColor};
  font-size: 14px;
`;

