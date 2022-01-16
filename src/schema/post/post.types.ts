import { gql } from 'apollo-server-express';
import { Upload } from 'graphql-upload';

const typeDefs = gql`
  scalar Upload
  type Query {
    getPost: Post
  }

  type Mutation {
    createPost(post: PostInput): id
  }

  type Post {
    title: String
    description: String
    type: String
    lube: String
    film: String
    file_: String
  }

  input PostInput {
    title: String
    description: String
    type: String
    lube: String
    film: String
    file_: String
  }
  type id {
    id: String
    title: String
  }
`;

export default typeDefs;
