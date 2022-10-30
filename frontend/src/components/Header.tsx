import React from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
// import logo from "../img/logo.svg";
import ButtonAsLink from "./ButtonAsLink";
import { IS_LOGGED_IN } from "../gql/query";

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;
const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;
const UserState = styled.div`
  margin-left: auto;
`;

const Header: React.FC = () => {
  const { data, client } = useQuery(IS_LOGGED_IN);
  const navigate = useNavigate();
  return (
    <HeaderBar>
      <img src={"logo"} alt="Notedly Logo" height="40" /> <LogoText>Notedly</LogoText>
      {/* Если авторизован, отображаем ссылку logout, в противном
        случае отображаем варианты sign in и sign up */}
      <UserState>
        {data.isLoggedIn ? (
          <ButtonAsLink
            onClick={() => {
              localStorage.removeItem("token");
              client.cache.writeQuery({ query: IS_LOGGED_IN, data: { isLoggedIn: false } });
              navigate("/");
            }}
          >
            LogOut
          </ButtonAsLink>
        ) : (
          <p>
            <Link to={"/signin"}>Sign In</Link> or <Link to={"/signup"}>Sign Up</Link>
          </p>
        )}
      </UserState>
    </HeaderBar>
  );
};
export default Header;
