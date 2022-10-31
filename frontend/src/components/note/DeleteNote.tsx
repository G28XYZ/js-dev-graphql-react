import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import ButtonAsLink from "../ButtonAsLink";
import { DELETE_NOTE } from "../../gql/mutation";
import { GET_MY_NOTES, GET_NOTES } from "../../gql/query";
import { useNavigate } from "react-router-dom";
import { LOCALE } from "../../hooks/useTranslate";

const DeleteNote: React.FC<any> = (props) => {
  const {
    data: { lang },
  } = useQuery(LOCALE);
  const navigate = useNavigate();
  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: {
      id: props.noteId,
    },
    refetchQueries: [GET_MY_NOTES, GET_NOTES],
    onCompleted: () => {
      navigate("/mynotes");
    },
  });
  return (
    <ButtonAsLink onClick={() => deleteNote()}>
      {lang.note.delete} {lang.note.note}
    </ButtonAsLink>
  );
};

export default DeleteNote;
