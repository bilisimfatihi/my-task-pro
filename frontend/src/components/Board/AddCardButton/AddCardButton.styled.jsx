import React from "react";
import styled from "styled-components";
import { FiPlus } from "react-icons/fi";

export const AddBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 335px;
  background-color: ${(p) => p.theme.colors.accentTextColor};
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  cursor: pointer;
  transition: all var(--primary-transition);
  margin-top: auto;

  &:hover {
    background-color: ${(p) => p.theme.colors.modalBtnHover};
  }

  @media screen and (min-width: 320px) and (max-width: 375px) {
    width: 260px;
  }
`;
export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background-color: ${(p) => p.theme.colors.whiteColor};
`;

export const Svg = styled(FiPlus)`
  font-size: 14px;
  color: ${(p) => p.theme.colors.primaryColor};
`;

export const BtnTextWrapp = styled.span`
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.02em;
  color: ${(p) => p.theme.colors.whiteColor};
`;
