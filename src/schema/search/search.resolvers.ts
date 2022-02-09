import SearchService from '@/services/search.service';

const searchService = new SearchService();

const resolvers = {
  Query: {
    getByType: async (_parent, _args, context) => {
      const posts = await searchService.fetchByType(_args.type);
      return posts;
    },
  },
};

export default resolvers;
