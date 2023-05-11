import { Model, INTEGER } from 'sequelize';
import TeamModel from './Team.model';
import db from '.';

class MatchModel extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeamId: {
    allowNull: false,
    type: INTEGER,
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamId: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: INTEGER,
  },
}, {
  tableName: 'matches',
  sequelize: db,
  timestamps: false,
  underscored: true,
});

TeamModel.hasMany(MatchModel, { foreignKey: 'homeTeamId' });
TeamModel.hasMany(MatchModel, { foreignKey: 'awayTeamId' });

MatchModel.belongsTo(TeamModel, { foreignKey: 'homeTeamId' });
MatchModel.belongsTo(TeamModel, { foreignKey: 'awayTeamId' });

export default MatchModel;
