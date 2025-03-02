import React from "react";
import {useNavigate} from "react-router-dom";
import WorkIcon from "@atlaskit/icon/glyph/folder";
import LightbulbIcon from "@atlaskit/icon/glyph/lightbulb";
import CustomerIcon from "@atlaskit/icon/glyph/person";
import DashboardIcon from "@atlaskit/icon/glyph/dashboard";
import SettingsIcon from "@atlaskit/icon/glyph/settings";
import GraphBarIcon from "@atlaskit/icon/glyph/graph-bar";
import {
  ButtonItem,
  LinkItem,
  NavigationFooter,
  NavigationHeader,
  NestableNavigationContent,
  NestingItem,
  Section,
  SideNavigation,
} from "@atlaskit/side-navigation";
import AppFrame from "./side-navigation/app-frame";
import SFooter from "./side-navigation/s-footer";
import SHeader from "./side-navigation/s-header";
import {useAuth} from "../../services/AuthProvider";

function Sidebar() {
  const navigate = useNavigate();
  let auth = useAuth();

  return (
    <AppFrame shouldHideAppBar shouldHideBorder>
      <SideNavigation label='project' testId='side-navigation'>
        <NavigationHeader>
          <SHeader />
        </NavigationHeader>
        <NestableNavigationContent
          initialStack={[]}
          testId='nestable-navigation-content'>
          <Section isList>
            <NestingItem
              id='1'
              isSelected
              testId='filter-nesting-item'
              title='Dashboard'
              iconBefore={<DashboardIcon label='' />}
              iconAfter={<LightbulbIcon label='' />}>
              <Section>
                <ButtonItem>Search issues</ButtonItem>
              </Section>
              <Section title='Starred' isList>
                <ButtonItem>Everything me</ButtonItem>
                <ButtonItem>My open issues</ButtonItem>
                <ButtonItem>Reported by me</ButtonItem>
              </Section>
              <Section hasSeparator title='Other' isList>
                <ButtonItem>All issues</ButtonItem>
                <ButtonItem>Open issues</ButtonItem>
                <ButtonItem>Created recently</ButtonItem>
                <ButtonItem>Resolved recently</ButtonItem>
              </Section>
              <Section hasSeparator>
                <ButtonItem>View all filters</ButtonItem>
              </Section>
            </NestingItem>
            <NestingItem
              id='2'
              title='Chart'
              iconBefore={<GraphBarIcon label='Chart' />}>
              <Section title='Monthly' isList>
                <ButtonItem>Electricity</ButtonItem>
                <ButtonItem>Water</ButtonItem>
              </Section>
              <Section hasSeparator>
                <ButtonItem>New Chart</ButtonItem>
              </Section>
            </NestingItem>
            <NestingItem
              id='3'
              iconBefore={<SettingsIcon label='' />}
              title='Settings'
              testId='settings-nesting-item'>
              <Section>
                <ButtonItem onClick={() => navigate("/users")}>
                  Users
                </ButtonItem>
                <ButtonItem onClick={() => navigate("/rooms")}>Room</ButtonItem>
              </Section>
            </NestingItem>
            <ButtonItem iconBefore={<WorkIcon label='' />}>
              Your work
            </ButtonItem>
            <NestingItem
              id='5'
              iconBefore={<CustomerIcon label='' />}
              title='My Account'
              testId='my-account-nesting-item'>
              <Section>
                <ButtonItem onClick={() => navigate("/profile")}>
                  Profile
                </ButtonItem>
                <ButtonItem
                  onClick={() => {
                    auth.signout(() => {
                      console.log("abccc");
                    });
                  }}>
                  Logout
                </ButtonItem>
              </Section>
            </NestingItem>
          </Section>
        </NestableNavigationContent>
        <NavigationFooter>
          <SFooter />
        </NavigationFooter>
      </SideNavigation>
    </AppFrame>
  );
}

export default Sidebar;
