import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import NoteFeed from "../components/note/NoteFeed";
import { GET_MY_NOTES } from "../gql/query";
import { LOCALE } from "../hooks/useTranslate";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";

const MyNotes: React.FC = () => {
  useEffect(() => {
    document.title = "My Notes — Notedly";
  });
  const {
    data: { lang },
  } = useQuery(LOCALE);
  const { loading, error, data } = useQuery(GET_MY_NOTES);
  if (loading) return <Loader />;
  if (error) return <Error message={error.message} />;
  if (data.me.notes.length !== 0) {
    return <NoteFeed notes={data.me.notes} />;
  } else {
    return <p>{lang.note.emptyNotes}</p>;
  }
};
export default MyNotes;
