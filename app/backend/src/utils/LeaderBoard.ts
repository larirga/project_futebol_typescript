import { MatchAttributes } from '../database/models/Match.model';

// RACIOCÍNIO:

// metodos => winner/draw/loser (como se fosse o setters and gatters?)
// metodos => totalPointsHome => return setWinner/draw/loser()

// home ganhar/winner
// goalsFavor?, goalsOwn?, totalPoints = +3, totalGames = +1, totalVictories = +1,
// - goalsFavor = homeTeamGoals??
// - goalsOwn = awayTeamGoals?

// home empatar/draw
// goalsFavor?, goalsOwn?, totalPoints = +1, totalGames = +1, totalDraws = + 1

// home perder/loser
// goalsFavor?, goalsOwn?, totalPoints = 0, totalGames = +1, totalLosses = +1

// home pontos totais/ totalPointsHome
// forEach para percorrer cada array homeTeam

// logica para se o homeTeamGoals ou GoalsFavor for maior que awayTeamGoals retorna
// home ganhar, o mesmo para empatar e perder

// na service => fazer forEach/map para percorrer cada possibilidade de novo new LeaderBoard, fazer um push e colocar em um array (ideia da cv com o paz para não ter problema de memoria)

// apenas requisito 24
// saldo de gols
// goalsFavor - goalsOwn => goalsBalance

// aproveitamento %
// [totalPoints / (totalGames * 3)] * 100 => efficiency
export interface Imatches {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export default class LeaderBoard {
  private name: string;
  private totalPoints: number;
  private totalGames: number;
  private totalVictories: number;
  private totalDraws: number;
  private totalLosses: number;
  private goalsFavor: number;
  private goalsOwn: number;

  constructor(name: string) {
    this.name = name;
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
  }

  private Winner(homeTeamGoals: number, awayTeamGoals: number) {
    this.goalsFavor += homeTeamGoals;
    this.goalsOwn += awayTeamGoals;
    this.totalPoints += 3;
    this.totalGames += 1;
    this.totalVictories += 1;
  }

  private Draw(homeTeamGoals: number, awayTeamGoals: number) {
    this.goalsFavor += homeTeamGoals;
    this.goalsOwn += awayTeamGoals;
    this.totalPoints += 1;
    this.totalGames += 1;
    this.totalDraws += 1;
  }

  private Loser(homeTeamGoals: number, awayTeamGoals: number) {
    this.goalsFavor += homeTeamGoals;
    this.goalsOwn += awayTeamGoals;
    this.totalGames += 1;
    this.totalLosses += 1;
  }

  public TotalPointsHome(Imatches: MatchAttributes[]) {
    Imatches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals > awayTeamGoals) this.Winner(homeTeamGoals, awayTeamGoals);
      if (homeTeamGoals === awayTeamGoals) this.Draw(homeTeamGoals, awayTeamGoals);
      if (homeTeamGoals < awayTeamGoals) this.Loser(homeTeamGoals, awayTeamGoals);
    });
    return {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn };
  }
}
