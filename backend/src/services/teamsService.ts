import { ITeamsArray, ITeamOne } from '../interfaces/teams';
import teamsModel from '../database/models/teamsModel';

const searchTeams = async (): Promise<ITeamsArray> => {
  const teams = await teamsModel.findAll();

  if (!teams) return { status: 401, notFound: 'Teams not found' };

  return { status: 200, message: teams };
};

const searchOneTeam = async (id: number): Promise<ITeamOne> => {
  const team = await teamsModel.findOne({ where: { id } });

  if (!team) return { status: 401, notFound: 'Team not found' };

  return { status: 200, message: team };
};

export default { searchTeams, searchOneTeam };
