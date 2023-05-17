import { Router } from 'express';
import LeaderController from '../controllers/LeaderBoard.controller';

const leaderRouter = Router();

leaderRouter.get('/home', LeaderController.getAllLeaderHome);

export default leaderRouter;
