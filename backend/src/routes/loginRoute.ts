import { Router } from 'express';
import validateLogin from '../middlewares/validateLogin';
import usersController from '../controllers/usersController';
import validateToken from '../token/validateToken';

const router = Router();

router.post('/', validateLogin, usersController.searchUser);
router.get('/validate', validateToken, usersController.validateUser);

export default router;
