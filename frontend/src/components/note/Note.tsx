import React from "react";
import ReactMarkdown from "react-markdown";
import { format, parseISO } from "date-fns";
import styled from "styled-components";
import NoteUser from "./NoteUser";
import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "../../gql/query";
import { LOCALE } from "../../hooks/useTranslate";

const StyledNote = styled.article`
  max-width: 800px;
  margin: 0 auto;
`;

const MetaData = styled.div`
  @media (min-width: 500px) {
    display: flex;
    align-items: top;
  }
`;

const MetaInfo = styled.div`
  padding-right: 1em;
`;

const UserActions = styled.div`
  margin-left: auto;
`;

export const Note: React.FC<any> = ({ note }) => {
  const { data } = useQuery(IS_LOGGED_IN);
  const {
    data: { lang },
  } = useQuery(LOCALE);

  return (
    <StyledNote>
      <MetaData>
        <MetaInfo>
          <img src={note.author.avatar} alt="{note.author.username} avatar" height="50px" />
        </MetaInfo>
        <MetaInfo>
          <em>{lang.note.by}</em> {note.author.username} <br />
          {format(parseISO(note.createdAt), "MMM dd yyyy")}
        </MetaInfo>
        {data.isLoggedIn ? (
          <UserActions>
            <NoteUser note={note} />
          </UserActions>
        ) : (
          <UserActions>
            <em>{lang.navigation.favorite}:</em> {note.favoriteCount}
          </UserActions>
        )}
      </MetaData>
      <ReactMarkdown children={note.content} />
    </StyledNote>
  );
};
