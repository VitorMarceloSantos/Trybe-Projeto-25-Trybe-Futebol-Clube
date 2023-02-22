import { Request, Response } from 'express';
import teamsService from '../services/teamsService';

const searchTeams = async (_req: Request, res: Response) => {
  const { status, message, notFound } = await teamsService.searchTeams();
  return status === 200
    ? res.status(status).json(message)
    : res.status(status).json({ message: notFound });
};

const searchOneTeam = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, message, notFound } = await teamsService.searchOneTeam(Number(id));
  return status === 200
    ? res.status(status).json(message)
    : res.status(status).json({ message: notFound });
};

export default { searchTeams, searchOneTeam };
