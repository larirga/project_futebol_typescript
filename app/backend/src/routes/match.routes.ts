import { Router } from 'express';
import MatchController from '../controllers/Match.controller';

const matchRouter = Router();

matchRouter.get('/', MatchController.getAllMatches);

export default matchRouter;
