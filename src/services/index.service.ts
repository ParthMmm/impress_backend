import { PrismaClient } from '@prisma/client';
import { User } from '@/interfaces/user.interface';

class IndexService {
  public users = new PrismaClient().user;

  public async test(): Promise<User[]> {
    const users: User[] = await this.users.findMany({
      select: { username: true, id: true },
    });

    console.log(users);
    return users;
  }
}

export default IndexService;
