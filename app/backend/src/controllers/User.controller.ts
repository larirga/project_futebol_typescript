import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { decodeToken } from '../utils/Auth';

export default class UserController {
  public static async login(req: Request, res: Response) {
    const token = await UserService.login(req.body);

    res.status(200).json({ token });
  }

  public static async getByRole(req: Request, res: Response) {
    const token = req.headers.authorization as string;
    const decode = decodeToken(token);
    // console.log(decode);
    const { id } = decode;

    const role = await UserService.getByRole(id);
    res.status(200).json({ role });
  }
}
