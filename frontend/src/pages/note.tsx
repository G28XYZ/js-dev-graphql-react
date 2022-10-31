import React from "react";
import { useQuery } from "@apollo/client";
import Note from "../components/Note";
import { GET_NOTE } from "../gql/query";
import { useParams } from "react-router-dom";

const NotePage: React.FC<any> = () => {
  const params = useParams();
  const id = params.id;
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! Note not found</p>;
  return <Note note={data.note} />;
};
export default NotePage;
