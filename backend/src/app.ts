import * as express from 'express';
import loginRoute from './routes/loginRoute';
import teamsRoute from './routes/teamRoute';
import matchRoute from './routes/matchRoute';
import leaderBoardRouteHome from './routes/leaderBoardRouteHome';
import leaderBoardRouteAway from './routes/leaderBoardRouteAway';
import leaderBoardRoute from './routes/leaderBoardRoute';

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
    this.app.use('/login', loginRoute);
    this.app.use('/teams', teamsRoute);
    this.app.use('/matches', matchRoute);
    this.app.use('/leaderboard/home', leaderBoardRouteHome);
    this.app.use('/leaderboard/away', leaderBoardRouteAway);
    this.app.use('/leaderboard', leaderBoardRoute);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
