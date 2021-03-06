import { Context } from './utils/context';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { ApolloServer, gql } from 'apollo-server-express';

import AuthService from 'services/auth.service';
import schema from './schema';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, responseLogger, errorLogger } from '@utils/logger';
import IndexRoute from '@routes/index.route';
import TestRoute from '@routes/test.route';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8000;
    this.env = process.env.NODE_ENV || 'development';

    this.initializeMiddlewares();

    this.initApolloServer();

    this.initializeRoutes();

    this.initializeErrorHandling();
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`🎮 http://localhost:${this.port}/graphql`);
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
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
    // this.app.use(cors);
    this.app.use(cookieParser());

    var corsOptions = {
      origin: [
        'http://localhost:3000/',
        'https://studio.apollographql.com',
        'localhost:3000/',
        '*',
        'true',
      ],
      credentials: true,
      allowedHeaders: [
        'Content-Type',
        'x-requested-with',
        'Authorization',
        'Accept',
        'token',
      ],
    };
    this.app.use(
      cors({
        origin: true,
        credentials: true,
      })
    );

    // this.app.use(cors());

    // this.app.use(cors(corsOptions));
    // this.app.use(function (req, res, next) {
    //   res.setHeader('Access-Control-Allow-Origin', [
    //     'https://studio.apollographql.com',
    //     'http://localhost:3000/',
    //     'localhost:3000/',
    //   ]);
    //   res.setHeader('Access-Control-Allow-Credentials', 'true');
    //   next();
    // });
    // this.app.use(cors());
    // this.app.options('http://localhost:3000/', cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    // this.app.use(cookieParser());
  }

  // private initializeRoutes(routes: Routes[]) {
  //   routes.forEach((route) => {
  //     this.app.use('/', route.router);
  //   });
  // }

  private initializeRoutes() {
    this.app.get('/', (req, res) => {
      res.send('Welcome to impress!');
    });

    this.app.get('/test', (req, res) => {
      res.send('test');
    });
  }
  private async initApolloServer() {
    const apolloServer = new ApolloServer({
      schema: schema,
      context: async ({ req, res }: any) => {
        const user = await authMiddleware(req);
        // console.log('🧘', { user });

        return { req, res, user };
      },
      // formatResponse: (response, request) => {
      //   responseLogger(request);

      //   return response;
      // },
      formatError: (error) => {
        errorLogger(error);

        return error;
      },
    });
    var corsOptions = {
      origin: [
        'https://studio.apollographql.com',
        'http://localhost:3000/',
        'localhost:3000/',
        '*',
      ],
      credentials: true,
    };
    await apolloServer.start();
    apolloServer.applyMiddleware({
      app: this.app,
      path: '/graphql',
      cors: false,
    });
  }
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
