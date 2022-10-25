import Pages from "./pages";
// Импортируем библиотеки Apollo Client
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "apollo-link-context";
import GlobalStyle from "./components/GlobalStyle";

// Настраиваем API URI и кэш
const uri = process.env.API_URI || "http://localhost:4000/api";
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();
// Проверяем наличие токена и возвращаем заголовки в контекст
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem("token") || "",
    },
  };
});
// Настраиваем Apollo Client
const client = new ApolloClient({
  link: Object.assign(authLink, httpLink),
  cache,
  resolvers: {},
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
