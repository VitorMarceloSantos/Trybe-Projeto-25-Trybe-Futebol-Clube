import { Request, Response } from 'express';
import leaderBoardService from '../services/leaderBoardService';

const searchLeaderHome = async (_req: Request, res: Response) => {
  const arrayResult = await leaderBoardService.searchLeaderHome();
  return res.status(200).json(arrayResult);
};

const searchLeaderAway = async (_req: Request, res: Response) => {
  const arrayResult = await leaderBoardService.searchLeaderAway();
  return res.status(200).json(arrayResult);
};

const searchLeader = async (_req: Request, res: Response) => {
  const arrayResult = await leaderBoardService.searchLeader();
  return res.status(200).json(arrayResult);
};

export default { searchLeaderHome, searchLeaderAway, searchLeader };
