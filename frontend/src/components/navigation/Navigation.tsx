import { useQuery } from "@apollo/client";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { LOCALE } from "../../hooks/useTranslate";

const Nav = styled.nav`
  padding: 1em;
  background: #f5f4f0;
  @media (max-width: 700px) {
    padding-top: 64px;
  }
  @media (min-width: 700px) {
    position: fixed;
    width: 220px;
    height: calc(100% - 64px);
    overflow-y: scroll;
  }
`;
const NavList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  line-height: 2;
  a {
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1em;
    color: #333;
  }
  a:visited {
    color: #333;
  }
  a.selected,
  a:hover,
  a:focus {
    color: #0077cc;
  }
`;

const Navigation: React.FC = () => {
  const location = useLocation();
  const {
    data: { lang },
  } = useQuery(LOCALE);

  return (
    <Nav>
      <NavList>
        <li>
          <Link to="/" className={`${location.pathname === "/" && "selected"}`}>
            🏠 {lang.navigation.home}
          </Link>
        </li>
        <li>
          <Link to="/mynotes" className={`${location.pathname === "/mynotes" && "selected"}`}>
            📝 {lang.navigation.myNotes}
          </Link>
        </li>
        <li>
          <Link to="/favorites" className={`${location.pathname === "/favorites" && "selected"}`}>
            ⭐ {lang.navigation.favorites}
          </Link>
        </li>
        <li>
          <Link to="/new" className={`${location.pathname === "/new" && "selected"}`}>
            📃 {lang.navigation.new}
          </Link>
        </li>
      </NavList>
    </Nav>
  );
};

export default Navigation;
