// Импортируем необходимые библиотеки
import { useQuery, gql } from "@apollo/client";
import ReactMarkdown from "react-markdown";

import Button from "../components/Button";
import NoteFeed from "../components/NoteFeed";

// Наш GraphQL-запрос, хранящийся в виде переменной
const GET_NOTES = gql`
  query NoteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
        id
        createdAt
        content
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;

const Home = () => {
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
