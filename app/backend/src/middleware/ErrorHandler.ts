import { NextFunction, Request, Response } from 'express';
import NotFoundError from '../utils/NotFoundError';
import ValidateError from '../utils/validateError';

export default class ErrorHandler {
  static handleError(error: Error, req: Request, res: Response, _next: NextFunction) {
    if (error instanceof ValidateError) {
      return res.status(400).json({ message: error.message });
    }

    if (error instanceof NotFoundError) {
      return res.status(404).json({ message: error.message });
    }

    console.error(error);
    res.status(500).end();
  }
}
