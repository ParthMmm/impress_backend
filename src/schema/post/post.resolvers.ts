import PostService from '@/services/post.service';
import { Post, User } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { Upload } from 'graphql-upload';

const postService = new PostService();

const resolvers = {
  Query: {
    getPosts: async (_parent, _args, context) => {
      const posts = await postService.fetchPosts(_args);
      return posts;
    },

    getSinglePost: async (_parent, _args, context) => {
      const post = await postService.getSinglePost(_args.id);
      return post;
    },

    getTotalPosts: async (_parent, context) => {
      const total = await postService.totalPosts();
      return total;
    },
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
    likePost: async (_parent, _args, context) => {
      // if (context.user) {
      //   const post = await postService.likePost(_args);
      //   return post;
      // } else {
      //   throw new HttpException(409, `not auth`);
      // }
      // console.log(_args.id);
      const post = await postService.likePost(_args.id);
      return post.likes;
    },
    dislikePost: async (_parent, _args, context) => {
      if (context.user) {
      } else {
        throw new HttpException(409, `not auth`);
      }
    },
  },
};

export default resolvers;
