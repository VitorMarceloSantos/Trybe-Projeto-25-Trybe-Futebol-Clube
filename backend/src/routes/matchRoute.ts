import { Router } from 'express';
import validateToken from '../token/validateToken';
import matchesController from '../controllers/matchesController';
import validateTeams from '../middlewares/validateTeams';

const router = Router();

router.get('/', matchesController.searchMatches);
router.post('/', validateToken, validateTeams, matchesController.addMatcheProgress);
router.patch('/:id/finish', matchesController.updateProgress);
router.patch('/:id', matchesController.updateProgressGoals);

export default router;
