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
        { model: MatchModel, as: 'homeTeam', where: { inProgress: false } },
      ],
    }) as unknown as teamHome[];
    // return allTeams;

    const leaderBoardTeam = allTeams.map((team) => {
      const newLeader = new LeaderBoard(team.teamName);
      return newLeader.TotalPointsHome(team.homeTeam);
    });

    return leaderBoardTeam.sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalVictories - a.totalVictories)
      .sort((a, b) => b.totalPoints - a.totalPoints);
    // return leaderBoardTeam;
  }
}
