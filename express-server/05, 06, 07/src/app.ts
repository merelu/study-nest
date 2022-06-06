import * as express from 'express';
import catRouter from './cats/cats.route';

class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRouter() {
    this.app.use(catRouter);
  }
  private setMiddleware() {
    this.app.use((req, res, next) => {
      console.log(req.rawHeaders[1]);
      console.log('this is logging middleware');
      next();
    });

    this.app.use(express.json());
    this.setRouter();

    this.app.use((req, res, next) => {
      console.log('this is error middleware');
      res.send({ error: '404 not found error' });
    });
  }

  public listen() {
    this.setMiddleware();
    this.app.listen(3000, () => {
      console.log('server is on...');
    });
  }
}

function init() {
  const app = new Server();
  app.listen();
}

init();
