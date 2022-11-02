import { BrowserRouter as Router, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "./home";
import MyNotes from "./mynotes";
import Favorites from "./favorites";
import NotePage from "./note";
import SignUp from "./auth/signup";
import SignIn from "./auth/signin";
import { useQuery } from "@apollo/client";
import NewNote from "./new";
import { GET_ME, IS_LOGGED_IN } from "../gql/query";
import EditNote from "./edit";
import React, { useMemo } from "react";
import { useCheckToken } from "../hooks/useCheckToken";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";

const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const { client } = useCheckToken();
  useMemo(
    () =>
      client.refetchQueries({
        include: [GET_ME],
      }),
    [location.pathname]
  );
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  if (loading) return <Loader />;
  if (error) return <Error />;
  return data.isLoggedIn === true ? <Outlet /> : <Navigate to={"/signin"} />;
};

const PrivateRoute: React.FC = () => {
  useCheckToken();
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  if (loading) return <Loader />;
  if (error) return <Error />;
  return !data.isLoggedIn === true ? <Outlet /> : <Navigate to={"/"} />;
};

const Pages: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewNote />} />
            <Route path="/mynotes" element={<MyNotes />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/edit/:id" element={<EditNote />} />
            <Route path="/note/:id" element={<NotePage />} />
          </Route>
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default Pages;
