import { FC, useEffect } from "react";
import { useMutation, useApolloClient, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import UserForm from "../../components/UserForm";
import { IS_LOGGED_IN } from "../../gql/query";
import { Loader } from "../../components/Loader";
import { Error } from "../../components/Error";

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

const SignUp: FC<any> = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Sign Up — Notedly";
  });

  const client = useApolloClient() as any;

  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.signUp);
      client.cache.writeQuery({
        query: IS_LOGGED_IN,
        data: {
          isLoggedIn: true,
        },
      });
      navigate("/");
    },
  });

  return (
    <>
      <UserForm action={signUp} formType="signup" />
      {loading && <Loader />}
      {error && <Error message="creating an account!" />}
    </>
  );
};
export default SignUp;
