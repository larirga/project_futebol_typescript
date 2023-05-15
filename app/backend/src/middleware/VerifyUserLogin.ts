import { Request, NextFunction, Response } from 'express';
import BadRequest from '../utils/BadRequest';
import isValidUser from '../utils/isValidUser';

const VerifyUserLogin = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.body.email || !req.body.password) {
    throw new BadRequest('All fields must be filled');
  }
  isValidUser(req.body);

  next();
};

export default VerifyUserLogin;
