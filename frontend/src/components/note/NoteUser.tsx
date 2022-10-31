import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_ME } from "../../gql/query";
import DeleteNote from "./DeleteNote";
import FavoriteNote from "./FavoriteNote";

const NoteUser: React.FC<any> = (props) => {
  const { loading, data } = useQuery(GET_ME);
  if (loading) return <p>Loading...</p>;
  return (
    <>
      <FavoriteNote me={data.me} noteId={props.note.id} favoriteCount={props.note.favoriteCount} />
      <br />
      {data.me.id === props.note.author.id && (
        <>
          <Link to={`/edit/${props.note.id}`}>Edit</Link>
          <DeleteNote noteId={props.note.id} />
        </>
      )}
    </>
  );
};

export default NoteUser;
