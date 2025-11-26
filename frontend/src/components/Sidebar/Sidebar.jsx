import React from "react";
import styled from "styled-components";

export const Sidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarContent>Sidebar</SidebarContent>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.aside`
  width: 260px;
  min-width: 260px;
  height: 100vh;
  background-color: ${(p) => p.theme.colors.sidebarBgColor};
  border-right: 1px solid ${(p) => p.theme.colors.modalBorderColorLowOp};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;

  @media screen and (max-width: 1439px) {
    display: none;
  }
`;

const SidebarContent = styled.div`
  padding: 24px;
  font-size: 18px;
  font-weight: 500;
  color: ${(p) => p.theme.colors.themeMainTextColor};
`;

export default Sidebar;
