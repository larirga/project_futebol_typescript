import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  public static async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const allMatches = await MatchService.getAllMatches(inProgress);
    res.status(200).json(allMatches);
  }

  public static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    await MatchService.finishMatch(+id);
    res.status(200).json({ message: 'Finished' });
  }

  public static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const updated = await MatchService.updateMatch(+id, homeTeamGoals, awayTeamGoals);
    res.status(200).json(updated);
  }
}
