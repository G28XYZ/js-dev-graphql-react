import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import NoteForm from "../components/NoteForm";
import { GET_MY_NOTES, GET_NOTES, NEW_NOTE } from "../gql/query";
import { useNavigate } from "react-router-dom";

const NewNote = (props: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Обновляем заголовок документа
    document.title = "New Note — Notedly";
  });

  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    // Повторно получаем запрос GET_NOTES, чтобы обновить кэш
    refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
    onCompleted: (data) => {
      // В финале перенаправляем пользователя на страницу заметки
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
