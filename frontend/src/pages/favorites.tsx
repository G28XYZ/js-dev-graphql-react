import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Error } from "../components/Error";
import { Loader } from "../components/Loader";
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
  if (loading) return <Loader />;
  if (error) return <Error message={error.message} />;
  if (data.me.favorites.length !== 0) {
    return <NoteFeed notes={data.me.favorites} />;
  } else {
    return <p>{lang.note.emptyFavorites}</p>;
  }
};
export default Favorites;
