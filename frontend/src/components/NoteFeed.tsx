import React, { FC } from "react";
import styled from "styled-components";
import Note from "./Note";
import { Link } from "react-router-dom";

const NoteWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 2em;
  padding-bottom: 2em;
  border-bottom: 1px solid #f5f4f0;
`;

const NoteFeed: FC<any> = ({ notes }) => {
  return (
    <div>
      {notes.map((note: any) => (
        <NoteWrapper key={note.id}>
          <Note note={note} />
          <Link to={`note/${note.id}`}>Permalink</Link>
        </NoteWrapper>
      ))}
    </div>
  );
};
export default NoteFeed;
