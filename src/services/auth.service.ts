import { compare, hash } from 'bcrypt';
import config from 'config';
import { sign } from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { isEmpty } from '@utils/util';

class AuthService {
  public users = new PrismaClient().user;

  public async signup(userData): Promise<User> {
    // let userData = {
    //   username: 'pog',
    //   password: 'password',
    // };
    const findUser: User = await this.users.findUnique({
      where: { username: userData.username },
    });

    // if(findUser)
    if (findUser)
      throw new HttpException(
        409,
        `You're username ${userData.username} already exists`
      );
    const hashedPassword = await hash(userData.password, 10);
    const createUserData: Promise<User> = this.users.create({
      data: { ...userData, password: hashedPassword },
    });

    return createUserData;
  }

  public async login(userData): Promise<{ cookie: string; findUser: User }> {
    const findUser: User = await this.users.findUnique({
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
    if (!isPasswordMatching)
      throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findFirst({
      where: { username: userData.username, password: userData.password },
    });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
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

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
