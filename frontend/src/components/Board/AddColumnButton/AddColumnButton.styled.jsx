import React from "react";
import styled from "styled-components";
import { FiPlus } from "react-icons/fi";

export const AddBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 334px;
  min-width: 334px;
  height: 52px;
  background-color: ${(p) => p.theme.colors.addColumnBtn};
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  cursor: pointer;
  flex-shrink: 0;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  @media screen and (min-width: 320px) and (max-width: 767px) {
    width: 100%;
    max-width: 334px;
    min-width: auto;
  }
`;
export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background-color: ${(p) => p.theme.colors.modalPlusIconWrapper};
`;

export const Svg = styled(FiPlus)`
  font-size: 14px;
  color: ${(p) => p.theme.colors.modalPlusIcon};
`;

export const BtnTextWrapp = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: -0.02em;
  color: ${(p) => p.theme.colors.secondaryTextColor};
`;
