import PostService from '@/services/post.service';
import { Post, User } from '@prisma/client';

const postService = new PostService();

const resolvers = {
  Query: {
    getPost: (_args, context) => {},
  },

  Mutation: {
    createPost: async (_parent, _args, context) => {
      if (context.user) {
        console.log('📮', _args, context.user);

        const post = await postService.createPost(_args.post, context.user);
        // console.log('📮', _args, context.user);
        return post;
      }
      console.log('📮📮', _parent, _args);
    },
  },
};

export default resolvers;
