interface ITeams {
  id: number;
  teamName: string;
}

interface ITeamsArray {
  status: number;
  message?: ITeams[];
  notFound?: string;
}

interface ITeamOne {
  status: number;
  message?: ITeams;
  notFound?: string;
}

export { ITeams, ITeamsArray, ITeamOne };
