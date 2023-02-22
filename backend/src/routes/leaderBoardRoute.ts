import { Router } from 'express';
import leaderBoardController from '../controllers/leaderBoardController';

const router = Router();

router.get('/', leaderBoardController.searchLeader);

export default router;
