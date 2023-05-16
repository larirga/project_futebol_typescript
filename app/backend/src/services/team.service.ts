import NotFoundError from '../utils/NotFoundError';
import TeamModel, { TeamAttributes } from '../database/models/Team.model';

export default class TeamService {
  public static async getAll(): Promise<TeamAttributes[]> {
    return TeamModel.findAll();
  }

  public static async getById(id: number): Promise<TeamAttributes> {
    const getId = await TeamModel.findByPk(id);

    if (!getId) throw new NotFoundError('There is no team with such id!');

    return getId;
  }
}
