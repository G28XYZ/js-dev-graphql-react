import React from "react";
import { useQuery } from "@apollo/client";
import { Note } from "../components/note";
import { GET_NOTE } from "../gql/query";
import { useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";

const NotePage: React.FC<any> = () => {
  const params = useParams();
  const id = params.id;
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
  if (loading) return <Loader />;
  if (error) return <Error message="Note not found" />;
  return <Note note={data.note} />;
};
export default NotePage;
