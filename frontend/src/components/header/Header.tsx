import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/logo.svg";
import ButtonAsLink from "../ButtonAsLink";
import { IS_LOGGED_IN } from "../../gql/query";
import { useCheckToken } from "../../hooks/useCheckToken";
import Locale from "../Locale";
import { LOCALE } from "../../hooks/useTranslate";

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
  margin-right: 10px;
  padding: 0;
  display: inline;
`;
const UserState = styled.div`
  margin-left: auto;
`;

const Header: React.FC = () => {
  const { data, client } = useQuery(IS_LOGGED_IN);
  const navigate = useNavigate();
  const {
    data: { lang },
  } = useQuery(LOCALE);

  const { token } = useCheckToken();

  useEffect(() => {
    if (token === null) navigate("/signin");
  }, [token, navigate]);

  return (
    <HeaderBar>
      <img src={logo} alt="Notedly Logo" height="40" /> <LogoText>Notedly</LogoText>
      <Locale />
      <UserState>
        {data.isLoggedIn ? (
          <ButtonAsLink
            onClick={() => {
              localStorage.removeItem("token");
              client.cache.writeQuery({ query: IS_LOGGED_IN, data: { isLoggedIn: false } });
              navigate("/");
            }}
          >
            {lang.header.logout}
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
