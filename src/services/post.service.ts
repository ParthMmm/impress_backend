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
class PostService {
  public async createPost(data: Post, userData: User) {
    const findUser = await prisma.user.findUnique({
      where: { username: userData.username },
    });

    if (!findUser) {
      throw new HttpException(409, 'Not authorized');
    }

    const x = await prisma.user.update({
      where: { id: findUser.id },
      data: {
        posts: {
          create: {
            title: data.title,
            description: data.description,
            file_: data.file_,
            tags: {
              create: { type: data.type, lube: data.lube, film: data.film },
            },
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

  public async fetchPosts() {
    const posts = await prisma.post.findMany({
      include: { author: true, tags: true },
    });

    console.log(posts);

    return posts;
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
}

export default PostService;
