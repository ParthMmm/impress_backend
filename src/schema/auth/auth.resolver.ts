import { sanitizedUser } from '@/interfaces/user.interface';
import AuthService from '@services/auth.service';
import { ApolloServer, gql } from 'apollo-server-express';
import { Prisma, PrismaClient, User } from '@prisma/client';

interface userSignUpInput {
  username: string;
  password: string;
}

// interface sanitizedUser

const prisma = new PrismaClient();
const authService = new AuthService();

const resolvers = {
  Query: {
    currentUser: (_parent, _args, context) => {
      if (!context.user) {
        return null;
      }
      console.log('🥷, yo');
      return context.user as sanitizedUser;
    },
  },
  Mutation: {
    signUp: async (
      _parent,
      args: { username: string; password: string },
      { res }
    ) => {
      const signUpUserData: User = await authService.signup(args);

      if (signUpUserData) {
        const { cookie, findUser } = await authService.login(args);
        res.setHeader('Set-Cookie', [cookie]);

        return findUser as sanitizedUser;
      }
      return;
    },
    logIn: async (
      _parent,
      args: { username: string; password: string },
      { res }
    ) => {
      const { cookie, findUser } = await authService.login(args);
      res.setHeader('Set-Cookie', [cookie]);
      // res.set('impress-auth', cookie);
      return findUser;
    },
  },
};

export default resolvers;
