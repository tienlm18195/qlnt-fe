import React, {useState} from "react";
import {
  Content,
  LeftPanel,
  LeftSidebar,
  Main,
  PageLayout,
  RightPanel,
  RightSidebar,
  TopNavigation,
} from '@atlaskit/page-layout';
import {Outlet, useLocation} from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import "../styles/home.css";

const initialState = {
  isBannerShown: true,
  isTopNavigationShown: false,
  isLeftPanelShown: true,
  isLeftSidebarShown: false,
  isMainShown: true,
  isRightSidebarShown: false,
  isRightPanelShown: false,
  isBannerFixed: true,
  isTopNavigationFixed: false,
  isLeftPanelFixed: false,
  isLeftPanelScrollable: false,
  isLeftSidebarFixed: false,
  isLeftSidebarScrollable: false,
  isMainScrollable: false,
  isMainExtraWide: false,
  isRightSidebarFixed: false,
  isRightSidebarScrollable: false,
  isRightPanelFixed: false,
  isRightPanelScrollable: false,
  isPageLayoutShown: true,
};

function Home() {
  const [gridState, setGridState] = useState(initialState);

  const location = useLocation();
  console.log('Current Path:', location.pathname);

  return (
    <PageLayout>
    {/* {gridState.isBannerShown && (
      <Header />
    )} */}

    {gridState.isTopNavigationShown && (
      <TopNavigation>Home Navigation</TopNavigation>
    )}

    {gridState.isLeftPanelShown && (
      <LeftPanel>
        <Sidebar />
      </LeftPanel>
    )}

    {gridState.isLeftSidebarShown && (
      <LeftSidebar>
        <Sidebar />
      </LeftSidebar>
    )}

    {gridState.isMainShown && (
      <Main>
        <Content>
          <Outlet />
        </Content>
      </Main>
    )}

    {gridState.isRightSidebarShown && (
      <RightSidebar>
        <p>Right Sidebar Content</p>
      </RightSidebar>
    )}

    {gridState.isRightPanelShown && (
      <RightPanel>
        <p>Extra Information</p>
      </RightPanel>
    )}
  </PageLayout>
  );
}

export default Home;
