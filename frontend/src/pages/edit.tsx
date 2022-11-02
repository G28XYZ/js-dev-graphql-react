import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME, GET_NOTE } from "../gql/query";
import NoteForm from "../components/note/NoteForm";
import { EDIT_NOTE } from "../gql/mutation";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";

const EditNote: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
  const { data: userData } = useQuery(GET_ME);
  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id,
    },
    onCompleted: () => {
      navigate(`/note/${id}`);
    },
  });
  if (loading) return <Loader />;
  if (error) return <Error message="Note not found" />;
  if (userData.me.id !== data.note.author.id) {
    return <p>You do not have access to edit this note</p>;
  }
  return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;
