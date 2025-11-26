import React from "react";
import styled from "styled-components";

const changeColor = (props) => {
  switch (props.value) {
    case "low":
      return `${props.theme.colors.priorityColorLow}`;
    case "medium":
      return `${props.theme.colors.priorityColorMedium}`;
    case "high":
      return `${props.theme.colors.priorityColorHigh}`;
    case "without":
      return `${props.theme.colors.priorityColorWithout}`;
    default:
      return `${props.theme.colors.priorityColorWithout}`;
  }
};

export const CardItem = styled.div`
  width: 334px;
  border-radius: 8px;
  border-left: 4px solid ${changeColor};
  background: ${(p) => p.theme.colors.themeWrapper};
  overflow: hidden;
  list-style: none;

  @media screen and (min-width: 320px) and (max-width: 767px) {
    width: 100%;
    max-width: 334px;
  }
`;
export const Container = styled.div`
  width: 100%;
  padding: 14px 20px 14px 20px;
  background: transparent;
`;
export const Title = styled.h2`
  font-weight: 600;
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: -0.02em;
  color: ${(p) => p.theme.colors.burgerColor};
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Description = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 1.33;
  letter-spacing: -0.02em;
  color: ${(p) => p.theme.colors.mainPageTextColor};
  max-height: 38px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 14px;
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(p) => p.theme.colors.priorityColorWithout};
  margin-bottom: 14px;
`;

export const UnderlineInfo = styled.div`
  display: flex;
  gap: 14px;
  align-items: flex-start;
`;

export const PriorityWrapp = styled.div`
  text-align: left;
  flex: 1;
`;

export const Subtitle = styled.div`
  font-weight: 400;
  font-size: 8px;
  line-height: 1.5;
  letter-spacing: -0.02em;
  color: ${(p) => p.theme.colors.mainPageTextColor};
  margin-bottom: 4px;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 4px;
`;

export const PriorityColor = styled.div`
  border-radius: 100%;
  width: 12px;
  height: 12px;
  background: ${changeColor};
  flex-shrink: 0;
`;

export const PriorityText = styled.span`
  text-transform: capitalize;
  font-weight: 400;
  font-size: 10px;
  line-height: 1.5;
  letter-spacing: -0.02em;
  color: ${(p) => p.theme.colors.burgerColor};
`;

export const DeadlineWrapp = styled.div`
  flex: 1;
  text-align: left;
`;

export const Date = styled.div`
  font-weight: 400;
  font-size: 10px;
  line-height: 1.5;
  letter-spacing: -0.02em;
  color: ${(p) => p.theme.colors.burgerColor};
`;
