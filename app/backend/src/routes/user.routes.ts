import { Router } from 'express';
import UserController from '../controllers/User.controller';
import VerifyUserLogin from '../middleware/VerifyUserLogin';
import verifyToken from '../middleware/VerifyToken';

const userRouter = Router();

userRouter.post('/', VerifyUserLogin, UserController.login);
userRouter.get('/role', verifyToken, UserController.getByRole);

export default userRouter;
