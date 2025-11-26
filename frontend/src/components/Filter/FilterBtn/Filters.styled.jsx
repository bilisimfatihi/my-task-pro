import React from "react";
import styled from "styled-components";
import { LiaFilterSolid } from "react-icons/lia";

export const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  column-gap: 8px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 6px 10px;

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
        return p?.theme?.colors?.whiteColor;
      case "clouds":
        return p?.theme?.colors?.blackColor;
      default:
        return p?.theme?.colors?.themeMainTextColor;
    }
  }};
  transition: color var(--primary-transition);

  &:hover {
    color: ${(p) => p?.theme?.colors?.accentTextColor};
    svg {
      fill: ${(p) => p?.theme?.colors?.accentTextColor};
    }
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }
`;

export const IconFilter = styled(LiaFilterSolid)`
  fill: ${(p) => {
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
        return p?.theme?.colors?.whiteColor;
      case "clouds":
        return p?.theme?.colors?.blackColor;
      default:
        return p?.theme?.colors?.themeMainTextColor;
    }
  }};
  width: 1.8rem;
  height: 1.8rem;
  transition: fill var(--primary-transition);
`;
