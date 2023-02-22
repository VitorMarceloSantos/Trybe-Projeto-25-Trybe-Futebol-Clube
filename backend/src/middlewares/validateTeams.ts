import { Request, Response, NextFunction } from 'express';
import { ITeamOne } from '../interfaces/teams';
import teamsService from '../services/teamsService';

export default async function validateTeams(req: Request, res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId } = req.body;
  // Realiza a busca dos Id's
  const verifyTeams: ITeamOne [] = await Promise.all([Number(homeTeamId), Number(awayTeamId)]
    .map((id) => teamsService.searchOneTeam(id)));

  for (let i = 0; i < verifyTeams.length; i += 1) { // As HOFS não funcina, pois continuam a repetir
    // Verifica se o time existe
    if (verifyTeams[i].status !== 200) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    // Verificar se os  dois times são iguais
    if ((i < verifyTeams.length - 1)
    && (verifyTeams[i].message?.teamName === verifyTeams[i + 1].message?.teamName)) {
      return res
        .status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
  }

  next();
}
