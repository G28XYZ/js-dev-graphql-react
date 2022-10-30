// Импортируем необходимые библиотеки
import React from "react";
import { useQuery } from "@apollo/client";
// import ReactMarkdown from "react-markdown";
import Button from "../components/Button";
import NoteFeed from "../components/NoteFeed";
import { GET_NOTES } from "../gql/query";

const Home: React.FC = () => {
  // Хук запроса
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);
  if (loading) return <p>loading...</p>;
  if (error) return <p>Error!</p>;
  console.log(data);
  return (
    <>
      <NoteFeed notes={data.noteFeed.notes} />
      {/* Only display the Load More button if hasNextPage is true */}
      {data.noteFeed.hasNextPage && (
        // onClick выполняет запрос, передавая в качестве переменной текущий курсор
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
                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage, // Совмещаем новые результаты со старыми
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
