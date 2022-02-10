import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date

  type Query {
    getByType(type: String): [DataPost]
    getByLube(lube: String): [DataPost]
    getByFilm(film: String): [DataPost]
  }
  type DataPost {
    id: String
    title: String
    description: String
    author: User
    createdAt: Date
    file_: String
    likes: Int
    dislikes: Int
    film: Tag
    lube: Tag
    type: Tag
  }
`;

export default typeDefs;
