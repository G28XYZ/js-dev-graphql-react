// Импортируем необходимые библиотеки
import React from "react";
import { useQuery } from "@apollo/client";
// import ReactMarkdown from "react-markdown";
import Button from "../components/Button";
import NoteFeed from "../components/note/NoteFeed";
import { GET_NOTES } from "../gql/query";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";

const Home: React.FC = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);
  if (loading) return <Loader />;
  if (error) return <Error />;
  return (
    <>
      <NoteFeed notes={data.noteFeed.notes} />
      {data.noteFeed.hasNextPage && (
        <Button
          onClick={() =>
            fetchMore({
              variables: {
                cursor: data.noteFeed.cursor,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                  noteFeed: {
                    cursor: fetchMoreResult.noteFeed.cursor,
                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                    notes: [...previousResult.noteFeed.notes, ...fetchMoreResult.noteFeed.notes],
                    __typename: "noteFeed",
                  },
                };
              },
            })
          }
        >
          Load more
        </Button>
      )}
    </>
  );
};
export default Home;
