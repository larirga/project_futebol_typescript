import TeamModel from '../database/models/Team.model';
import MatchModel, { MatchAttributes } from '../database/models/Match.model';
import UnprocessableEntity from '../utils/UnprocessableEntity';
import TeamService from './team.service';

export default class MatchService {
  public static async getAllMatches(inProgress: unknown): Promise<MatchAttributes[]> {
    const allMatches = await MatchModel.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    if (inProgress === 'true') {
      const filterAllMatches = allMatches.filter((match) => match.inProgress === true);
      return filterAllMatches;
    }

    if (inProgress === 'false') {
      const filterAllMatches = allMatches.filter((match) => match.inProgress === false);
      return filterAllMatches;
    }
    // console.log(allMatches);
    return allMatches;
  }

  public static async finishMatch(id: number) {
    const matchId = await MatchModel.findByPk(id);
    const matchFinish = await matchId?.update({ inProgress: false }, { where: { id } });
    return matchFinish;
  }

  public static async updateMatch(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const matchId = await MatchModel.findByPk(id);
    const matchUpdate = await matchId?.update({ homeTeamGoals, awayTeamGoals });
    return matchUpdate;
  }

  public static async createMatch(
    homeTeamId: number,
    homeTeamGoals: number,
    awayTeamId: number,
    awayTeamGoals: number,
  ) {
    if (awayTeamId === homeTeamId) {
      throw new UnprocessableEntity('It is not possible to create a match with two equal teams');
    }

    await TeamService.getById(homeTeamId);
    await TeamService.getById(awayTeamId);

    const newMatch = await MatchModel.create({
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress: true,
    });
    return newMatch;
  }
}
