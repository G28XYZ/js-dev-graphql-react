import React from "react";
import Pages from "./pages";
import GlobalStyle from "./components/GlobalStyle";
import { useCheckToken } from "./hooks/useCheckToken";

const App: React.FC = () => {
  useCheckToken();
  return (
    <>
      <GlobalStyle />
      <Pages />
    </>
  );
};

export default App;
