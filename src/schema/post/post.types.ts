// import { Tag, DataPost } from './../../../../client/generates';
import { IsString } from 'class-validator';
import { gql } from 'apollo-server-express';
import { Upload } from 'graphql-upload';

const typeDefs = gql`
  scalar Date
  type Query {
    getPosts(range: Int): [DataPost]
    getSinglePost(id: String): DataPost
    getTotalPosts: Int
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
    likes: Int
    dislikes: Int
    film: Tag
    lube: Tag
    type: Tag
  }

  type Tag {
    id: Int
    name: String
  }

  type User {
    id: String
    user: String
  }
`;

export default typeDefs;
