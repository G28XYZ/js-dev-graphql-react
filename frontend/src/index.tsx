import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ApolloClient, ApolloLink, ApolloProvider, concat, HttpLink, InMemoryCache } from "@apollo/client";
import { IS_LOGGED_IN } from "./gql/query";
import { LOCALE, localize } from "./hooks/useTranslate";

// const uri = "https://js-dev-graphql-react.vercel.app/api";
const uri = "http://localhost:4000/api";
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
cache.writeQuery({ query: LOCALE, data: { lang: localize.ru } });

client.onResetStore(() => new Promise(() => cache.writeQuery({ ...queryLoggedIn })));

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
