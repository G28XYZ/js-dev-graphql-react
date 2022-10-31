import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslate } from "../hooks/useTranslate";
import Button from "./Button";

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

const Submit = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserForm: React.FC<any> = (props) => {
  const { lang } = useTranslate();

  const [values, setValues] = useState({});
  const onChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <Wrapper>
      {props.formType === "signup" ? <h2>{lang.auth.register}</h2> : <h2>{lang.auth.signIn}</h2>}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          props.action({
            variables: {
              ...values,
            },
          });
        }}
      >
        {props.formType === "signup" && (
          <>
            <label htmlFor="username">{lang.auth.username}:</label>
            <input required type="text" id="username" name="username" placeholder={lang.auth.username} onChange={onChange} />
          </>
        )}
        <label htmlFor="email">{lang.auth.email}:</label>
        <input required type="email" id="email" name="email" placeholder={lang.auth.email} onChange={onChange} />
        <label htmlFor="password">{lang.auth.password}:</label>
        <input required type="password" id="password" name="password" placeholder={lang.auth.password} onChange={onChange} />
        <Submit>
          <Button type="submit">{lang.auth.submit}</Button>
          {props.formType === "signup" ? (
            <div>
              {lang.auth.isRegistered} <Link to={"/signin"}>{lang.auth.signIn}</Link>
            </div>
          ) : (
            <div>
              {lang.auth.notRegistered} <Link to={"/signup"}>{lang.auth.register}</Link>
            </div>
          )}
        </Submit>
      </Form>
    </Wrapper>
  );
};

export default UserForm;
