import prisma from '@/utils/client';

class SearchService {
  public async fetchByType(type: string) {
    const findByType = await prisma.type.findMany({
      where: {
        name: type,
      },
      include: {
        posts: {
          include: {
            author: true,
            film: true,
            lube: true,
            type: true,
          },
        },
      },
    });

    // const findByType = await prisma.post.findMany({
    //   where: {
    //     type: {
    //       name: type,
    //     },
    //   },
    //   include: { author: true, film: true, lube: true, type: true },
    // });

    return findByType[0].posts;
  }

  public async fetchByFilm(film: string) {
    const findByFilm = await prisma.film.findMany({
      where: {
        name: film,
      },
      include: {
        posts: {
          include: {
            author: true,
            film: true,
            lube: true,
            type: true,
          },
        },
      },
    });
    return findByFilm[0].posts;
  }
  public async fetchByLube(lube: string) {
    const findByLube = await prisma.lube.findMany({
      where: {
        name: lube,
      },
      include: {
        posts: {
          include: {
            author: true,
            film: true,
            lube: true,
            type: true,
          },
        },
      },
    });
    return findByLube[0].posts;
  }
}

export default SearchService;
