import React from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";

export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.theme.colors.modalBgColor};
`;

export const Modal = styled.div`
  position: relative;
  width: 335px;
  border: 1px solid ${(p) => p.theme.colors.modalBorderColorLowOp};
  border-radius: 8px;
  background-color: ${(p) => p.theme.colors.modalWindowsBgColor};
  box-shadow: 0 4px 16px 0 rgba(22, 22, 22, 0.08);

  @media screen and (min-width: 320px) and (max-width: 375px) {
    width: 90%;
  }
  @media screen and (min-width: 768px) {
    width: 350px;
  }
`;

export const ModalContainer = styled.div`
  padding: 24px;
  position: relative;
`;

export const CloseIcon = styled(IoClose)`
  font-size: 24px;
  color: ${(p) => p.theme.colors.secondaryTextColor};
  position: absolute;
  top: 14px;
  right: 14px;
  cursor: pointer;

  transition: all var(--primary-transition);

  &:hover {
    transform: rotate(90deg);
    color: ${(p) => p.theme.colors.accentTextColor};
  }
`;

export const Title = styled.h2`
  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.02em;
  color: ${(p) => p.theme.colors.burgerColor};
  margin-bottom: 24px;
`;
