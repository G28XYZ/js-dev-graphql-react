// Импортируем необходимые библиотеки
import { useQuery, gql } from "@apollo/client";
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
  return <div>The data loaded!</div>;
};
export default Home;
