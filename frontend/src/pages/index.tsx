import { BrowserRouter as Router, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "./home";
import MyNotes from "./mynotes";
import Favorites from "./favorites";
import NotePage from "./note";
import SignUp from "./signup";
import SignIn from "./signin";
import { useQuery } from "@apollo/client";
import NewNote from "./new";
import { IS_LOGGED_IN } from "../gql/query";
import EditNote from "./edit";
import React from "react";

const ProtectedRoute: React.FC = () => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return data.isLoggedIn === true ? <Outlet /> : <Navigate to={"/signin"} />;
};

const PrivateRoute: React.FC = () => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return !data.isLoggedIn === true ? <Outlet /> : <Navigate to={"/"} />;
};

const Pages: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<PrivateRoute />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="new" element={<NewNote />} />
            <Route path="mynotes" element={<MyNotes />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="edit/:id" element={<EditNote />} />
            <Route path="note/:id" element={<NotePage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};
export default Pages;
