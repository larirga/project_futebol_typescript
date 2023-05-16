import TeamModel from '../database/models/Team.model';
import MatchModel, { MatchAttributes } from '../database/models/Match.model';

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
}
