import React from "react";
import styled, { css } from "styled-components";

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding-right: 8px;
  margin-bottom: 0;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 12px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 12px;
    background-color: transparent;
  }

  ${(p) =>
    p?.$scrollable &&
    css`
      &::-webkit-scrollbar-thumb {
        background-color: ${(p) => p.theme.colors.cardListScrollThumb};
      }
      &::-webkit-scrollbar-track {
        background-color: ${(p) => p.theme.colors.cardListScrollBar};
      }
    `}
`;
