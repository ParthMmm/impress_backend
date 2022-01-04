import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { Strategy } from 'passport-local';
// import { User } from '@interfaces/user.interface';
import { PrismaClient, User } from '@prisma/client';
import { compare, hash } from 'bcrypt';

const users = new PrismaClient().user;

passport.serializeUser((user, done) => {
  done(null, (user as User).id);
});

passport.deserializeUser(async (id: string | number, done) => {
  const findUser: User = await users.findUnique({
    where: { id: parseInt(id.toString()) },
  });

  if (!findUser) return done('no user to deseralize');

  return done(null, findUser);
});

passport.use(
  'signup',
  new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const findUser: User = await users.findUnique({
          where: { username: username },
        });

        if (!findUser) {
          console.log('unique!');
          const hashedPassword = await hash(password, 10);

          const createUserData: Promise<User> = users.create({
            data: { username: username, password: hashedPassword },
          });
          console.log(createUserData);
          return done(null, createUserData, { message: 'User created!' });
        } else {
          console.log('not unique!');

          return done(null, false, { message: 'Not a unique username' });
        }
      } catch (error) {
        console.log('24314214', error);
        return done(null, error, { message: 'Not a unique username' });
      }
    }
  )
);
