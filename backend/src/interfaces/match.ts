interface IMatch {
  iḍ?: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
}

interface IMatchProgress extends IMatch {
  inProgress: boolean,
}

interface IMachComplete extends IMatchProgress{
  homeTeam: {
    teamName: string
  },
  awayTeam: {
    teamName: string
  }
}

interface IMatchReturn {
  status: number,
  message: IMachComplete[] | string
}

export { IMatch, IMatchProgress, IMachComplete, IMatchReturn };
