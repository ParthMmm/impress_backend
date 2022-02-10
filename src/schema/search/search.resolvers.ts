import SearchService from '@/services/search.service';

const searchService = new SearchService();

const resolvers = {
  Query: {
    getByType: async (_parent, _args, context) => {
      const posts = await searchService.fetchByType(_args.type);
      return posts;
    },
    getByLube: async (_parent, _args, context) => {
      const posts = await searchService.fetchByLube(_args.lube);
      return posts;
    },
    getByFilm: async (_parent, _args, context) => {
      const posts = await searchService.fetchByFilm(_args.film);
      return posts;
    },
  },
};

export default resolvers;
