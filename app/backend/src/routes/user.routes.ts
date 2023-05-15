import { Router } from 'express';
import UserController from '../controllers/User.controller';
import VerifyUserLogin from '../middleware/VerifyUserLogin';

const userRouter = Router();

userRouter.post('/', VerifyUserLogin, UserController.login);

export default userRouter;
