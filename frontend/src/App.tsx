import Pages from "./pages";
// Импортируем библиотеки Apollo Client
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import GlobalStyle from "./components/GlobalStyle";

// Настраиваем API URI и кэш
const uri = process.env.API_URI || "http://localhost:4000/api";
const cache = new InMemoryCache();
console.log(uri);
// Настраиваем Apollo Client
const client = new ApolloClient({
  uri,
  cache,
  connectToDevTools: true,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
}

export default App;
