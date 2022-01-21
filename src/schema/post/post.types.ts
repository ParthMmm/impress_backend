import { Tag } from './../../../../client/generates';
import { IsString } from 'class-validator';
import { gql } from 'apollo-server-express';
import { Upload } from 'graphql-upload';

const typeDefs = gql`
  scalar Upload
  scalar Date
  type Query {
    getPosts(range: Int): [DataPost]
  }

  type Mutation {
    createPost(post: PostInput): id
    likePost(id: String): String
    dislikePost(id: String): String
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

  type Tag {
    id: String
    type: String
    lube: String
    film: String
  }

  type User {
    id: String
    user: String
  }
`;

export default typeDefs;
