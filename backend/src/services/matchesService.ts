import Team from '../database/models/teamsModel';
import matchesModel from '../database/models/matchesModel';
import { IMatch } from '../interfaces/match';
// : Promise<IMatchReturn>
const searchMatches = async () => {
  const matches = await matchesModel.findAll({
    include: [
      { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      { model: Team, as: 'awayTeam', attributes: ['teamName'] }] });

  if (!matches) return { status: 401, message: 'Matches not found' };

  return { status: 200, message: matches };
};

const searchMatchesProgress = async (inProgress: boolean) => {
  const matchesProgress = await matchesModel.findAll({ where: { inProgress },
    include: [
      { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      { model: Team, as: 'awayTeam', attributes: ['teamName'] }] });

  // if (!matchesProgress) return { status: 401, message: 'Matches not found' };
  return { status: 200, message: matchesProgress };
};

const addMatcheProgress = async (match: IMatch) => {
  // const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = match;
  const addMacth = await matchesModel.create({
    ...match,
    inProgress: true,
  });

  if (!addMacth) return { status: 400, message: 'Matche not created' }; // verificar retorno
  return { status: 201, message: { id: addMacth.id, ...match, inProgress: true } };
};

const updateProgress = async (id: string) => {
  await matchesModel.update({ inProgress: false }, { where: { id } });
  return { status: 200, message: 'Finished' };
};

const updateProgressGoals = async (id: string, homeTeamGoals: number, awayTeamGoals: number) => {
  await matchesModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  return { status: 200, message: { homeTeamGoals, awayTeamGoals } };
};

export default {
  searchMatches, searchMatchesProgress, addMatcheProgress, updateProgress, updateProgressGoals,
};
