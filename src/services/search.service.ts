import prisma from '@/utils/client';

class SearchService {
  public async fetchByType(type: string) {
    const findByType = await prisma.post.findMany({
      where: {
        tags: { every: { type: type } },
      },
      include: {
        author: true,
        tags: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log(findByType);

    return findByType;
  }
}

export default SearchService;
