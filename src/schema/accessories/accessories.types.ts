import { gql } from 'apollo-server-express';
// import { Lube } from '@/interfaces/accessories.interface';
const typeDefs = gql`
  type Lube {
    id: Int
    name: String
  }
  type Film {
    id: Int
    name: String
  }
  type Query {
    getLubes: [Lube]
    tester: String
    getFilms: [Film]
  }
`;

export default typeDefs;
