import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';

import { Routes } from '@interfaces/routes.interface';
// import errorMiddleware from '@middlewares/error.middleware';
// import { logger, stream } from '@utils/logger';

// import { Magic } from '@magic-sdk/admin';

// const mAdmin = new Magic(process.env.SECRET_KEY); // ✨

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 8000;
    this.env = process.env.NODE_ENV || 'development';

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    // this.initializeErrorHandling();
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
      //   logger.info(`=================================`);
      //   logger.info(`======= ENV: ${this.env} =======`);
      //   logger.info(`🚀 App listening on the port ${this.port}`);
      //   logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    // this.app.use(morgan(config.get('log.format'), { stream }));
    // this.app.use(
    //   cors({
    //     origin: config.get('cors.origin'),
    //     credentials: config.get('cors.credentials'),
    //   })
    // );
    // this.app.use(hpp());
    // this.app.use(helmet());
    // this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }
  //   private initializeErrorHandling() {
  //     this.app.use(errorMiddleware);
  //   }
}

// async function main() {
//   await prisma.user.create({
//     data: {
//       name: 'asdfdf',
//       email: 'asdf@prisma.io',
//       posts: {
//         create: { title: 'dasdv World' },
//       },
//       profile: {
//         create: { bio: 'I sfvdfv turtles' },
//       },
//     },
//   });
// }

// app.get('/', (req, res) => {
//   res.json({ message: '👋' });
// });
// app.get('/yo', (req, res) => {
//   res.json({ message: '👋poop' });
//   main()
//     .catch((e) => {
//       throw e;
//     })
//     .finally(async () => {
//       await prisma.$disconnect();
//     });
// });

// app.get('/users', async (req, res) => {
//   const allUsers = await prisma.user.findMany({
//     include: {
//       posts: true,
//       profile: true,
//     },
//   });
//   res.json({ allUsers });
// });
export default App;
