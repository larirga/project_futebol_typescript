import LeaderBoard, { Imatches } from '../utils/LeaderBoard';
import MatchModel from '../database/models/Match.model';
import TeamModel from '../database/models/Team.model';

export interface teamHome {
  id: number;
  teamName: string;
  homeTeam: Imatches[]
}

export default class LeaderService {
  public static async getAllLeaderHome() {
    const allTeams = await TeamModel.findAll({
      include: [
        { model: MatchModel, as: 'homeTeam' },
      ],
    }) as unknown as teamHome[];
    // return allTeams;

    const leaderBoardTeam = allTeams.map((team) => {
      const newLeader = new LeaderBoard(team.teamName);
      return newLeader.TotalPointsHome(team.homeTeam);
    });

    return leaderBoardTeam;
  }
}
