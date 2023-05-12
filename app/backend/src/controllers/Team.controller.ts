import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  public static async getAll(req: Request, res: Response) {
    const allTeams = await TeamService.getAll();
    res.status(200).json(allTeams);
  }
}
