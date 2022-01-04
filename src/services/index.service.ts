import { PrismaClient } from '@prisma/client';
import { sanitizedUser } from '@/interfaces/user.interface';

class IndexService {
  public users = new PrismaClient().user;

  public async test(): Promise<sanitizedUser> {
    const users: sanitizedUser = await this.users.findMany({
      select: { username: true, id: true },
    });

    console.log(users);
    return users;
  }
}

export default IndexService;
