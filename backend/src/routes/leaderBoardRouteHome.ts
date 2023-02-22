import { Router } from 'express';
import leaderBoardController from '../controllers/leaderBoardController';

const router = Router();

router.get('/', leaderBoardController.searchLeaderHome);

export default router;
