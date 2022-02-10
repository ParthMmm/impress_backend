import { compare, hash } from 'bcryptjs';
import config from 'config';
import { sign } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';

import { isEmpty } from '@utils/util';
import prisma from '@/utils/client';
import { Post } from '@/interfaces/post.interface';
import { User } from '@/interfaces/user.interface';
import uploadFile from '@/utils/bucket';

interface Props {
  data: Post;
  userData: User;
}

interface Pagination {
  range: number;
  starting: number;
}
class PostService {
  public async createPost(data: Post, userData: User) {
    const findUser = await prisma.user.findUnique({
      where: { username: userData.username },
    });

    if (!findUser) {
      throw new HttpException(409, 'Not authorized');
    }

    const findFilm = await prisma.film.findUnique({
      where: { name: data.film },
    });
    const findLube = await prisma.lube.findUnique({
      where: { name: data.lube },
    });
    const findType = await prisma.type.findUnique({
      where: { name: data.type },
    });

    const x = await prisma.user.update({
      where: { id: findUser.id },
      data: {
        posts: {
          create: {
            title: data.title,
            description: data.description,
            file_: data.file_,
            type: {
              connect: {
                id: findType.id,
              },
            },
            film: {
              connect: {
                id: findFilm.id,
              },
            },
            lube: {
              connect: {
                id: findLube.id,
              },
            },
            // film: {
            //   connectOrCreate: {
            //     where: {
            //       id: 1,
            //     },
            //     create: {
            //       name: data.film,
            //     },
            //   },
            // },
            // tags: {
            //   create: { type: data.type, lube: data.lube, film: data.film },
            // },
          },
        },
      },
      include: {
        posts: true,
      },
    });

    if (!x) {
      throw new HttpException(409, `error creating post`);
    }

    const post = await prisma.user.findFirst({
      select: {
        posts: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return post.posts.find((x) => x);
  }

  public async fetchPosts({ range }: Pagination) {
    const posts = await prisma.post.findMany({
      skip: range,
      take: 5,
      include: { author: true, film: true, lube: true, type: true },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return posts;
  }

  public async totalPosts() {
    const num = await prisma.post.aggregate({
      _count: true,
    });
    return num._count;
  }

  public async likePost(id: string) {
    const post = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        likes: { increment: 1 },
      },
    });
    return post;
  }

  public async dislikePost(id: string) {
    const post = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        likes: { decrement: 1 },
      },
    });
    return post;
  }

  public async getSinglePost(id: string) {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
      include: { author: true, film: true, lube: true, type: true },
    });

    return post;
  }
}

export default PostService;
