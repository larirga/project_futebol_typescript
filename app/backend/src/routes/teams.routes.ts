import { Router } from 'express';
import TeamController from '../controllers/Team.controller';

const teamRouter = Router();

teamRouter.get('/', TeamController.getAll);

export default teamRouter;
