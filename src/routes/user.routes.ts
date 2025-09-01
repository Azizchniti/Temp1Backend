import express from 'express';
import {
  getAllUsersController,
  updateUserController,
  deleteUserController
} from '../controllers/user.controller';

const router = express.Router();

router.get('/listallusers', getAllUsersController);
router.put('/updateuser/:id', updateUserController);
router.delete('/deleteuser/:id', deleteUserController);

export default router;
