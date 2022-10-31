import { useQuery } from "@apollo/client";
import { GET_ME, IS_LOGGED_IN } from "../gql/query";

export const useCheckToken = () => {
  const token = localStorage.getItem("token");
  const { client } = useQuery(GET_ME, {
    onCompleted(data) {
      if (token === null || data === undefined) {
        localStorage.removeItem("token");
        client.cache.writeQuery({ query: IS_LOGGED_IN, data: { isLoggedIn: false } });
      }
    },
  });
  return (() => ({ token }))();
};
