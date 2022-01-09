import { compare, hash } from 'bcrypt';
import config from 'config';
import { sign } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';

import { isEmpty } from '@utils/util';
import prisma from '@/utils/client';
import { Post } from '@/interfaces/post.interface';
import { User } from '@/interfaces/user.interface';

interface Props {
  data: Post;
  userData: User;
}
class PostService {
  public async createPost(data: Post, userData: User) {
    // const x = await prisma.user.create({
    //   data: {
    //     posts: {},
    //   },
    // });
    console.log('📫', data);

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
          },
        },
      },
    });
    console.log(post.posts.find((x) => x.id));

    return post.posts.find((x) => x.id);
  }
}

export default PostService;
