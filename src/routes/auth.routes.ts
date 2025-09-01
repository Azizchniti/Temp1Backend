import { Router } from 'express';
import * as userController from '../controllers/auth.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/signup', userController.signUpUserController);
router.post('/signin', userController.signInUserController);
router.post('/invite', userController.inviteUserController);
router.post('/change-password', authenticateToken, userController.changePasswordController);
router.post('/request-password-reset', userController.requestPasswordResetController);

router.get('/me', authenticateToken, userController.getCurrentUserController);
router.post('/logout', userController.logoutUserController);

export default router;
