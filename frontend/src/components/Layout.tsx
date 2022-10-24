import { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navigation from "./Navigation";

export interface LayoutProps {
  children?: ReactNode;
}

const Layout: FC<LayoutProps> = () => {
  return (
    <>
      <Header />
      <div className="wrapper">
        <Navigation />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};
export default Layout;
