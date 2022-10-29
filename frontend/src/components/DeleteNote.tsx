import React from "react";
import { useMutation } from "@apollo/client";
import ButtonAsLink from "./ButtonAsLink";
import { DELETE_NOTE } from "../gql/mutation";
import { GET_MY_NOTES, GET_NOTES } from "../gql/query";
import { useNavigate } from "react-router-dom";

const DeleteNote = (props: any) => {
  const navigate = useNavigate();
  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: {
      id: props.noteId,
    },
    refetchQueries: [GET_MY_NOTES, GET_NOTES],
    onCompleted: (data) => {
      navigate("/mynotes");
    },
  });
  return <ButtonAsLink onClick={() => deleteNote()}>Delete Note</ButtonAsLink>;
};

export default DeleteNote;
