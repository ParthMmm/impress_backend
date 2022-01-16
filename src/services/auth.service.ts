import { compare, hash } from 'bcryptjs';
import config from 'config';
import { sign } from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { isEmpty } from '@utils/util';
import prisma from '@/utils/client';

class AuthService {
  public async signup(userData): Promise<User> {
    const findUser: User = await prisma.user.findUnique({
      where: { username: userData.username },
    });

    if (findUser)
      throw new HttpException(
        409,
        `You're username ${userData.username} already exists`
      );
    const hashedPassword = await hash(userData.password, 10);
    const createUserData: Promise<User> = prisma.user.create({
      data: { ...userData, password: hashedPassword },
    });

    return createUserData;
  }

  public async login(userData): Promise<{ cookie: string; findUser: User }> {
    const findUser: User = await prisma.user.findUnique({
      where: { username: userData.username },
    });

    // if(findUser)
    if (!findUser)
      throw new HttpException(
        409,
        `You're username ${userData.username} does not exists`
      );

    const isPasswordMatching: boolean = await compare(
      userData.password,
      findUser.password
    );

    if (!isPasswordMatching) throw new HttpException(409, 'Wrong password');

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(
    userData: User
  ): Promise<{ cookie: string; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await prisma.user.findFirst({
      where: { username: userData.username, password: userData.password },
    });
    if (!findUser) throw new HttpException(409, "You're not user");

    // const tokenData = this.deleteToken(findUser);
    const cookie = this.deleteCookie();

    return { cookie, findUser };
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = config.get('secretKey');
    const expiresIn: number = 60 * 60;

    return {
      expiresIn,
      token: sign(dataStoredInToken, secretKey, { expiresIn }),
    };
  }

  public deleteToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = config.get('secretKey');
    const expiresIn: number = 0;

    return {
      expiresIn,
      token: sign(dataStoredInToken, secretKey, { expiresIn }),
    };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  public deleteCookie(): string {
    return `Authorization=""; HttpOnly; Max-Age=0;`;
  }
}

export default AuthService;
