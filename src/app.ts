import express, { Application } from 'express';
import { PrismaClient } from '@prisma/client';

const app: Application = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function main() {
  await prisma.user.create({
    data: {
      name: 'asdfdf',
      email: 'asdf@prisma.io',
      posts: {
        create: { title: 'dasdv World' },
      },
      profile: {
        create: { bio: 'I sfvdfv turtles' },
      },
    },
  });
}

app.get('/', (req, res) => {
  res.json({ message: '👋' });
});
app.get('/yo', (req, res) => {
  res.json({ message: '👋poop' });
  main()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
});

app.get('/users', async (req, res) => {
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  res.json({ allUsers });
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port} 🚀`));
