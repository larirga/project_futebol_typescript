import TeamModel, { TeamAttributes } from '../database/models/Team.model';

export default class TeamService {
  public static async getAll(): Promise<TeamAttributes[]> {
    return TeamModel.findAll();
  }
}
