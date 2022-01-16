import PostService from '@/services/post.service';
import { Post, User } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { Upload } from 'graphql-upload';

const postService = new PostService();

const resolvers = {
  Query: {
    getPost: (_args, context) => {},
  },

  Mutation: {
    createPost: async (_parent, _args, context) => {
      if (context.user) {
        const post = await postService.createPost(_args.post, context.user);
        return post;
      } else {
        throw new HttpException(409, `not auth`);
      }
    },
  },
};

export default resolvers;
