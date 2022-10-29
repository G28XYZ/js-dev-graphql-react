import { FC, useEffect } from "react";
import { useMutation, useApolloClient, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import UserForm from "../components/UserForm";
import { IS_LOGGED_IN } from "../gql/query";

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

const SignUp: FC<any> = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Sign Up — Notedly";
  });

  const client = useApolloClient() as any;

  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: (data) => {
      console.log(data);
      // Сохраняем JWT в localStorage
      localStorage.setItem("token", data.signUp);
      // запись в локальный стейт isLoggedIn
      client.cache.writeQuery({
        query: IS_LOGGED_IN,
        data: {
          isLoggedIn: true,
        },
      });
      // Перенаправляем пользователя на домашнюю страницу
      navigate("/");
    },
  });

  return (
    <>
      <UserForm action={signUp} formType="signup" />
      {/* Если данные загружаются, отображаем сообщение о загрузке */}
      {loading && <p>Loading...</p>}
      {/* Если при загрузке произошел сбой, отображаем сообщение об ошибке */}
      {error && <p>Error creating an account!</p>}
    </>
  );
};
export default SignUp;
