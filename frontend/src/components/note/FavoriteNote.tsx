import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import ButtonAsLink from "../ButtonAsLink";
import { TOGGLE_FAVORITE } from "../../gql/mutation";
import { GET_MY_FAVORITES } from "../../gql/query";
import { LOCALE } from "../../hooks/useTranslate";

const FavoriteNote: React.FC<any> = (props) => {
  const [count, setCount] = useState(props.favoriteCount);
  const [favorited, setFavorited] = useState(props.me.favorites.filter((note: any) => note.id === props.noteId).length > 0);
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: {
      id: props.noteId,
    },
    refetchQueries: [{ query: GET_MY_FAVORITES }],
  });
  const {
    data: { lang },
  } = useQuery(LOCALE);
  return (
    <>
      {favorited ? (
        <ButtonAsLink
          onClick={() => {
            toggleFavorite();
            setFavorited(false);
            setCount(count - 1);
          }}
        >
          {lang.note.removeFavorite}
        </ButtonAsLink>
      ) : (
        <ButtonAsLink
          onClick={() => {
            toggleFavorite();
            setFavorited(true);
            setCount(count + 1);
          }}
        >
          {lang.note.addFavorite}
        </ButtonAsLink>
      )}
      : {count}
    </>
  );
};

export default FavoriteNote;
