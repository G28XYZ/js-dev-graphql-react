import Pages from "./pages";
import { ApolloClient, ApolloLink, ApolloProvider, concat, HttpLink, InMemoryCache } from "@apollo/client";
import GlobalStyle from "./components/GlobalStyle";
import { Test } from "./test";
import { IS_LOGGED_IN } from "./gql/query";

const uri = process.env.API_URI || "https://js-dev-graphql-react.vercel.app/api";
const cache = new InMemoryCache();

const httpLink = new HttpLink({ uri });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: localStorage.getItem("token") || null,
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  uri,
  cache,
  defaultOptions: {
    watchQuery: {
      nextFetchPolicy(currentFetchPolicy) {
        if (currentFetchPolicy === "network-only" || currentFetchPolicy === "cache-and-network") {
          return "cache-first";
        }
        return currentFetchPolicy;
      },
    },
  },
});

export const queryLoggedIn = {
  query: IS_LOGGED_IN,
  data: {
    isLoggedIn: !!localStorage.getItem("token"),
  },
};

cache.writeQuery(queryLoggedIn);

client.onResetStore(() => new Promise(() => cache.writeQuery({ ...queryLoggedIn })));

function App() {
  const test = new Test();
  test.testCallback();
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
}

export default App;
