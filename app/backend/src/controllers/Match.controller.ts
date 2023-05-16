import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  public static async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const allMatches = await MatchService.getAllMatches(inProgress);
    res.status(200).json(allMatches);
  }
}
