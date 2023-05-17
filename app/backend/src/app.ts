import * as express from 'express';
import ErrorHandler from './middleware/ErrorHandler';
import teamRouter from './routes/teams.routes';
import 'express-async-errors';
import userRouter from './routes/user.routes';
import matchRouter from './routes/match.routes';
import leaderRouter from './routes/leader.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);

    this.app.use('/teams', teamRouter);
    this.app.use('/login', userRouter);
    this.app.use('/matches', matchRouter);
    this.app.use('/leaderboard', leaderRouter);

    this.app.use(ErrorHandler.handleError);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
