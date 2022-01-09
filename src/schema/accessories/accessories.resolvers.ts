import AccessoriesService from '@/services/accessories.service';

const accessoriesService = new AccessoriesService();

const resolvers = {
  Query: {
    getLubes: async () => {
      const lubes = await accessoriesService.fetchLubes();
      return lubes;
    },
    tester: async (_parent, _args, context) => {
      return '👋yo';
    },

    getFilms: async () => {
      const films = await accessoriesService.fetchFilms();
      return films;
    },
  },
};

export default resolvers;
