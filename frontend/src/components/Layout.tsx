import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Header from "./header/Header";
import Navigation from "./navigation/Navigation";

export interface LayoutProps {
  children?: ReactNode;
}

const Wrapper = styled.div`
  @media (min-width: 700px) {
    display: flex;
    top: 64px;
    position: relative;
    height: calc(100% - 64px);
    width: 100%;
    flex: auto;
    flex-direction: column;
  }
`;
const Main = styled.main`
  position: fixed;
  height: calc(100% - 185px);
  width: 100%;
  padding: 1em;
  overflow-y: scroll;
  @media (min-width: 700px) {
    flex: 1;
    margin-left: 220px;
    height: calc(100% - 64px);
    width: calc(100% - 220px);
  }
`;

const Layout: React.FC<LayoutProps> = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Navigation />
        <Main>
          <Outlet />
        </Main>
      </Wrapper>
    </>
  );
};

export default Layout;
