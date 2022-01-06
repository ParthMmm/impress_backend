import { ApolloServer, gql } from 'apollo-server-express';

interface userSignUpInput {
  username: string;
  password: string;
}
const typeDefs = gql`
  type User {
    id: Int
    username: String
    password: String
  }
  type Query {
    currentUser: User!
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

export default typeDefs;
