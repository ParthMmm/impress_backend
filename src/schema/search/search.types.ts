import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date

  type Query {
    getByType(type: String): [DataPost]
  }
  type DataPost {
    id: String
    title: String
    description: String
    author: User
    createdAt: Date
    file_: String
    tags: [Tag]
    likes: Int
    dislikes: Int
  }
`;

export default typeDefs;
