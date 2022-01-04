import { PrismaClient, User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';

class AuthService {
  public users = new PrismaClient().user;

  public async signup() {
    let userData = {
      email: 'testeroani@test.com',
      password: 'password',
    };
    const findUser: User = await this.users.findUnique({
      where: { email: userData.email },
    });
    console.log(findUser);
    // if(findUser)
    if (findUser)
      throw new HttpException(
        409,
        `You're email ${userData.email} already exists`
      );
    const hashedPassword = await hash(userData.password, 10);
    const createUserData: Promise<User> = this.users.create({
      data: { ...userData, password: hashedPassword },
    });

    return createUserData;
  }
}

export default AuthService;
