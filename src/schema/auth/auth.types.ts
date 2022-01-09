import { gql } from 'apollo-server-express';

interface userSignUpInput {
  username: string;
  password: string;
}
const typeDefs = gql`
  type User {
    id: String
    username: String
    password: String
  }
  type Query {
    currentUser: User!
    test: String
  }
  type Mutation {
    signUp(username: String, password: String): User
    logIn(username: String, password: String): User
    logOut: User
  }

  input userSignUpInput {
    username: String!
    password: String!
  }
`;

export default typeDefs;
