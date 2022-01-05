import AuthService from '@services/auth.service';
import { ApolloServer, gql } from 'apollo-server-express';
import { Prisma, PrismaClient, User } from '@prisma/client';

interface userSignUpInput {
  username: string;
  password: string;
}

const prisma = new PrismaClient();
const authService = new AuthService();

const resolvers = {
  Query: {
    allUsers: (_parent, _args, context) => {
      if (!context.user) {
        return null;
      }
      return prisma.user.findMany();
    },
  },
  Mutation: {
    signUp: async (_parent, args: { username: string; password: string }) => {
      const signUpUserData: User = await authService.signup(args);
      return signUpUserData;
    },
    logIn: async (
      _parent,
      args: { username: string; password: string },
      { res }
    ) => {
      const { cookie, findUser } = await authService.login(args);
      console.log(cookie);
      res.setHeader('Set-Cookie', [cookie]);
      // res.set('impress-auth', cookie);
      return findUser;
    },
  },
};

export default resolvers;
