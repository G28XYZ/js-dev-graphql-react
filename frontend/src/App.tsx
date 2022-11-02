import React from "react";
import Pages from "./pages";
import GlobalStyle from "./components/GlobalStyle";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Pages />
    </>
  );
};

export default App;
