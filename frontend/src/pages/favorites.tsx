import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import NoteFeed from "../components/note/NoteFeed";
import { GET_MY_FAVORITES } from "../gql/query";
import { LOCALE } from "../hooks/useTranslate";

const Favorites: React.FC = () => {
  useEffect(() => {
    document.title = "Favorites — Notedly";
  });
  const { loading, error, data } = useQuery(GET_MY_FAVORITES);
  const {
    data: { lang },
  } = useQuery(LOCALE);
  if (loading) return <>"Loading..."</>;
  if (error) return <>`Error! ${error.message}`</>;
  if (data.me.favorites.length !== 0) {
    return <NoteFeed notes={data.me.favorites} />;
  } else {
    return <p>{lang.note.emptyFavorites}</p>;
  }
};
export default Favorites;
