import React, { FC } from "react";
// Импортируем зависимости GraphQL
import { useQuery } from "@apollo/client";
// Импортируем компонент Note
import Note from "../components/Note";
import { GET_NOTE } from "../gql/query";
import { useParams } from "react-router-dom";

const NotePage: FC<any> = (props) => {
  const params = useParams();
  // Сохраняем id из url в виде переменной
  const id = params.id;
  // Запрашиваем хук, передавая значение id в качестве переменной
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
  // Если данные загружаются, отображаем сообщение о загрузке
  if (loading) return <p>Loading...</p>;
  // Если при получении данных произошел сбой, отображаем сообщение об ошибке
  if (error) return <p>Error! Note not found</p>;
  // Если загрузка данных произошла успешно, отображаем их в UI
  return <Note note={data.note} />;
};
export default NotePage;
