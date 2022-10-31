import React from "react";
import styled from "styled-components";
import { Note } from "./Note";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { LOCALE } from "../../hooks/useTranslate";

const NoteWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 2em;
  padding-bottom: 2em;
  border-bottom: 1px solid #f5f4f0;
`;

const NoteFeed: React.FC<any> = ({ notes }) => {
  const {
    data: { lang },
  } = useQuery(LOCALE);
  return (
    <div>
      {notes.map((note: any) => (
        <NoteWrapper key={note.id}>
          <Note note={note} />
          <Link to={`/note/${note.id}`}>{lang.note.link}</Link>
        </NoteWrapper>
      ))}
    </div>
  );
};
export default NoteFeed;
