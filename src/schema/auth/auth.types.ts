import { ApolloServer, gql } from 'apollo-server-express';

interface userSignUpInput {
  username: string;
  password: string;
}
const typeDefs = gql`
  type User {
    username: String
    password: String
  }
  type Query {
    allUsers: [User!]!
  }
  type Mutation {
    signUp(username: String, password: String): User
  }
  type Mutation {
    logIn(username: String, password: String): User
  }

  input userSignUpInput {
    username: String!
    password: String!
  }
`;

module.exports = typeDefs;
