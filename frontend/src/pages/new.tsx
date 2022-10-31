import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import NoteForm from "../components/note/NoteForm";
import { GET_MY_NOTES, GET_NOTES, NEW_NOTE } from "../gql/query";
import { useNavigate } from "react-router-dom";

const NewNote: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "New Note — Notedly";
  });

  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
    onCompleted: (data) => {
      navigate(`/note/${data.newNote.id}`);
    },
  });

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error saving the note</p>}
      <NoteForm action={data} />
    </>
  );
};

export default NewNote;
