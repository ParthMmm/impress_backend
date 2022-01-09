import { sanitizedUser } from '@/interfaces/user.interface';
import AuthService from '@services/auth.service';
import { User } from '@prisma/client';

interface userSignUpInput {
  username: string;
  password: string;
}

const authService = new AuthService();

const resolvers = {
  Query: {
    currentUser: (_parent, _args, context) => {
      let x: sanitizedUser = {
        id: null,
        username: null,
      };
      if (!context.user) {
        return x;
      }
      // console.log(context.user);
      // console.log('🥷, yo');
      return context.user as sanitizedUser;
    },
    test: async (_parent, _args, context) => {
      return '👋yo';
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

      res.cookie(cookie);
      // res.setHeader('Set-Cookie', [cookie]);
      // res.set('impress-auth', cookie);
      return findUser;
    },
    logOut: async (_parent, _args, context, { res }) => {
      let x: sanitizedUser = {
        id: null,
        username: null,
      };
      if (!context.user) {
        return null;
      }
      const { cookie, findUser } = await authService.logout(context.user);
      console.log(':cookie:');
      console.log({ cookie }, { findUser });

      // res.setHeader('Set-Cookie', [cookie]);
      // if (cookie) {
      context.res.cookie(
        `Authorization=deleted; HttpOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT`
      );
      // }
      return null;
    },
    // logOut: async (_parent, _args, context, { res }) => {
    //   if (!context.user) {
    //     return null;
    //   }
    //   const { cookie, findUser } = await authService.logout(context.user);

    //   console.log({ cookie }, { findUser });

    //   // res.setHeader('Set-Cookie', [cookie]);
    //   res.cookie(cookie);
    //   return { message: 'logged out' };
    // },
  },
};

export default resolvers;
