import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { useMutation, useApolloClient, gql } from "@apollo/client";

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`;
const Form = styled.form`
  label,
  input {
    display: block;
    line-height: 2em;
  }
  input {
    width: 100%;
    margin-bottom: 1em;
  }
`;
// Добавляем props, передаваемый в компонент для дальнейшего использования
const SignUp: FC<any> = (props) => {
  useEffect(() => {
    // Обновляем заголовок документа
    document.title = "Sign Up — Notedly";
  });
  // Устанавливаем состояние формы по умолчанию
  const [values, setValues] = useState({});
  // Обновляем состояние при вводе пользователем данных
  const onChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  // Apollo Client
  const client = useApolloClient();
  //Добавляем хук мутации
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: (data) => {
      // Сохраняем JWT в localStorage
      localStorage.setItem("token", data.signUp);
      // Обновляем локальный кэш
      client.wtiteData({ data: { isLoggedIn: true } });
      // Перенаправляем пользователя на домашнюю страницу
      props.history.push("/");
    },
  });

  return (
    <Wrapper>
      <h2>Sign Up</h2>
      {/* Когда пользователь отправляет форму, передаем ее данные в мутацию */}
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          signUp({
            variables: {
              ...values,
            },
          });
        }}
      >
        <label htmlFor="username">Username:</label>
        <input required type="text" name="username" placeholder="username" onChange={onChange} />
        <label htmlFor="email">Email:</label>
        <input required type="email" name="email" placeholder="Email" onChange={onChange} />
        <label htmlFor="password">Password:</label>
        <input required type="password" name="password" placeholder="Password" onChange={onChange} />
        <Button type="submit">Submit</Button>
      </Form>
    </Wrapper>
  );
};
export default SignUp;
