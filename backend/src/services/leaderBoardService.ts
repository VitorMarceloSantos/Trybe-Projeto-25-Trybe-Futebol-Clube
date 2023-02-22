import routeSelectedLeader from '../functions/routeSelectedLeader';
import routeSelectedAway from '../functions/routeSelectdAway';
import routeSelectedHome from '../functions/routeSelectedHome';
import { IMachComplete } from '../interfaces/match';
import matchesService from './matchesService';

const searchLeaderHome = async () => {
  const { message } = await matchesService.searchMatchesProgress(false); // partidas encerradas
  const matchResult = message as unknown as IMachComplete[];

  const arrayResult = routeSelectedHome(matchResult);

  return arrayResult;
};

const searchLeaderAway = async () => {
  const { message } = await matchesService.searchMatchesProgress(false); // partidas encerradas
  const matchResult = message as unknown as IMachComplete[];

  const arrayResult = routeSelectedAway(matchResult);

  return arrayResult;
};

const searchLeader = async () => {
  const { message } = await matchesService.searchMatchesProgress(false); // partidas encerradas
  const matchResult = message as unknown as IMachComplete[];

  const arrayResult = routeSelectedLeader(matchResult);

  return arrayResult;
};

export default { searchLeaderHome, searchLeaderAway, searchLeader };
