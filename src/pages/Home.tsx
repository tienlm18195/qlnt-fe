import React, {useCallback, useState} from "react";
import {
  Banner,
  Content,
  LeftPanel,
  LeftSidebar,
  LeftSidebarState,
  Main,
  PageLayout,
  RightPanel,
  RightSidebar,
  TopNavigation,
} from '@atlaskit/page-layout';
import {Outlet, redirect} from "react-router-dom";
import AuthStatus from "../services/AuthStatus";
import Sidebar from "../components/layout/Sidebar";
import "../styles/home.css";

type SlotName =
  | 'Banner'
  | 'TopNavigation'
  | 'LeftPanel'
  | 'LeftSidebar'
  | 'Main'
  | 'RightSidebar'
  | 'RightPanel'
  | 'PageLayout';

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

  return (
    <>

    </>
  );
}


              {/* 2️⃣ Render the app routes via the Layout Outlet */}
              {/* <Outlet /> */}

export default Home;
