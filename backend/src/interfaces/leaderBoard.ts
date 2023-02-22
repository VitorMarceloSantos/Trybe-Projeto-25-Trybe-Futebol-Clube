interface ILeaderBoard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
  addPointsVictory(): void,
  addPointsDraw(): void,
  addGames(): void,
  addTotalVictories(): void,
  addTotalDraws(): void,
  addTotalLosses(): void,
  addGoalsFavor(goals: number): void,
  addGoalsOwn(goals: number): void,
  resultGoalsBalance(): void,
  resultEfficiency(): void,
}

export default ILeaderBoard;
