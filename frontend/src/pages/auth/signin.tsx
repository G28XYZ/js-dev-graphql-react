import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../../components/UserForm";
import { IS_LOGGED_IN } from "../../gql/query";

export const SIGNIN_USER = gql`
  mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

const SignIn: React.FC<any> = () => {
  const { data, client } = useQuery(IS_LOGGED_IN);
  const navigate = useNavigate();

  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.signIn);
      client.cache.writeQuery({ query: IS_LOGGED_IN, data: { isLoggedIn: true } });
      navigate("/");
    },
    onQueryUpdated(observableQuery) {
      return observableQuery.refetch();
    },
  });

  useEffect(() => {
    document.title = "Sign In — Notedly";
    if (data.isLoggedIn) navigate("/");
  });
  return (
    <>
      <UserForm action={signIn} formType="signIn" />
      {loading && <p>Loading...</p>}
      {error && <p>Error signing in!</p>}
    </>
  );
};

export default SignIn;
