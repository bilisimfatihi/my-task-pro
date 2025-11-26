import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from './Header';
import Sidebar from './Sidebar';


const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <Shell>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <ContentArea>
        <Header onMenuClick={toggleSidebar} />
        <MainWrapper>
          <Outlet />
        </MainWrapper>
      </ContentArea>
    </Shell>
  );
};

const Shell = styled.div`
  display: flex;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  background: ${(p) => p.theme.colors.mainBgColor};
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
`;

const MainWrapper = styled.main`
  flex: 1;
  overflow: hidden;
  height: calc(100vh - 60px);
  max-height: calc(100vh - 60px);
`;

export default MainLayout;
