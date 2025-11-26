import React from "react";
import styled from "styled-components";

export const HeaderDashboardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
  flex-shrink: 0;

  @media screen and (min-width: 768px) {
    margin-bottom: 14px;
  }
`;

export const BoardTitle = styled.h2`
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
      case "balloon":
      case "kapadokia":
      case "pink-tree":
      case "ship":
      case "unsplash":
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
