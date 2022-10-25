import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "../components/Layout";

import Home from "./home";
import MyNotes from "./mynotes";
import Favorites from "./favorites";
import NotePage from "./note";
import SignUp from "./signup";

const Pages = () => {
  return (
    <Router>
      <Routes>
        <Route path="signup" element={<SignUp />} />
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="mynotes" element={<MyNotes />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="note/:id" element={<NotePage />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default Pages;
