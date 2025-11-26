import React from "react";
import styled, { css } from "styled-components";

export const BoardWrapper = styled.div`
  display: flex;
  gap: 12px;
  height: 100%;
  overflow: visible;
  min-height: 0;

  @media (min-width: 768px) {
    gap: 26px;
  }
`;

export const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ColumnList = styled.ul`
  display: flex;
  gap: 26px;
  margin-bottom: 12px;
  list-style: none;
  padding: 0;
  height: 100%;
  align-items: flex-start;
`;

export const ColumnItem = styled.li`
  list-style: none;
  flex-shrink: 0;
  height: 100%;
  min-height: 0;
  display: flex;
  width: 334px;

  @media screen and (max-width: 767px) {
    width: 90vw;
    max-width: 334px;
  }
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  gap: 12px;
  max-height: 100%;
  width: 334px;

  @media screen and (max-width: 767px) {
    width: 90vw;
    max-width: 334px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  width: 334px;
  height: 56px;
  background: ${(p) => p.theme.colors.addColumnBtn};
  padding: 14px 16px;
  margin-bottom: 8px;
  flex-shrink: 0;

  @media screen and (max-width: 767px) {
    width: 100%;
    max-width: 334px;
  }
`;

export const BoardTitle = styled.h2`
  position: absolute;
  top: 14px;
  left: 20px;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.02em;
  color: ${(p) => {
    switch (p?.$colorBg) {
      case "night":
      case "moon":
      case "plant":
      case "rocks":
      case "full-moon":
      case "gorge":
      case "ocean":
      case "milky-way":
        return p.theme.colors.whiteColor;
      case "clouds":
        return p.theme.colors.blackColor;
      default:
        return p.theme.colors.themeMainTextColor;
    }
  }};

  @media screen and (min-width: 768px) {
    font-size: 18px;
  }
`;

export const ColumnTitle = styled.h2`
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.02em;
  color: ${(p) => p.theme.colors.burgerColor};
`;
