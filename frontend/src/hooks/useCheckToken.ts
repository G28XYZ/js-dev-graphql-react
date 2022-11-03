import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { GET_ME, IS_LOGGED_IN } from "../gql/query";

export const useCheckToken = () => {
  const { data, client } = useQuery(GET_ME, {
    onCompleted(data) {
      if (data === undefined) resetSession();
    },
    onError() {
      resetSession();
    },
  });

  const [token] = useState(localStorage.getItem("token"));

  const resetSession = useCallback(() => {
    localStorage.removeItem("token");
    client.cache.writeQuery({ query: IS_LOGGED_IN, data: { isLoggedIn: false } });
  }, [client.cache]);

  const checkToken = useCallback(() => {
    if (token && token !== localStorage.getItem("token")) resetSession();
  }, [resetSession, token]);

  useEffect(() => {
    window.addEventListener("storage", checkToken);
    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, [checkToken]);

  return { token, data, client };
};
