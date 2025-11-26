import React from "react";
import styled, { css } from "styled-components";

export const MainWrapper = styled.main`
  width: 100%;
  position: relative;
  background-color: ${(p) => p.theme.colors.mainBgColor};
  padding: 16px 20px 16px;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 18px 28px 22px;
  }

  @media (min-width: 1440px) {
    height: 100%;
    max-width: 118rem;
  }

  ${(props) =>
    props.$background &&
    props.$background !== "default" &&
    props.$loc !== "/home" &&
    css`
      background-image: url(/images/background/mobile/${props.$background}-mobile.jpg);

      @media (min-device-pixel-ratio: 2),
        (min-resolution: 192dpi),
        (min-resolution: 2dppx) {
        background-image: url(/images/background/mobile/${props.$background}-mobile_2x.jpg);
      }

      @media screen and (min-width: 768px) {
        background-image: url(/images/background/tablet/${props.$background}-tablet.jpg);
      }

      @media screen and (min-width: 768px) and (min-device-pixel-ratio: 2),
        (min-resolution: 192dpi),
        (min-resolution: 2dppx) {
        background-image: url(/images/background/tablet/${props.$background}-tablet_2x.jpg);
      }

      @media screen and (min-width: 1440px) {
        background-image: url(/images/background/desktop/${props.$background}-desktop.jpg);
      }

      @media screen and (min-width: 1440px) and (min-device-pixel-ratio: 2),
        (min-resolution: 192dpi),
        (min-resolution: 2dppx) {
        background-image: url(/images/background/desktop/${props.$background}-desktop_2x.jpg);
      }

      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    `}
`;

export const MainDashboard = styled.div`
  flex: 1;
  overflow-x: auto;
  overflow-y: visible;
  width: 100%;
  min-height: 0;

  &::-webkit-scrollbar {
    height: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(p) => p.theme.colors.cardListScrollThumb};
    border-radius: 12px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 12px;
    background-color: ${(p) => p.theme.colors.cardListScrollBar};
  }
`;
