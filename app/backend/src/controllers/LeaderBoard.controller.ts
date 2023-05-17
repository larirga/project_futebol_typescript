import { Request, Response } from 'express';
import LeaderService from '../services/leader.service';
import LeaderBoard from '../utils/LeaderBoard';

export default class LeaderController extends LeaderBoard {
  public static async getAllLeaderHome(req: Request, res: Response) {
    const allLeader = await LeaderService.getAllLeaderHome();
    res.status(200).json(allLeader);
  }
}
