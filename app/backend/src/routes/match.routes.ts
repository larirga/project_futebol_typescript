import { Router } from 'express';
import MatchController from '../controllers/Match.controller';
import verifyToken from '../middleware/VerifyToken';

const matchRouter = Router();

matchRouter.get('/', MatchController.getAllMatches);
matchRouter.patch('/:id/finish', verifyToken, MatchController.finishMatch);

export default matchRouter;
