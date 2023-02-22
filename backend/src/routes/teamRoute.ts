import { Router } from 'express';
import teamsController from '../controllers/teamsController';

const router = Router();

router.get('/', teamsController.searchTeams);
router.get('/:id', teamsController.searchOneTeam);

export default router;
