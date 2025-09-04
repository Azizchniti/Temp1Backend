import express from 'express';
import {
  getAllUsersController,
  updateUserController,
  deleteUserController,
  getUserByIdController
} from '../controllers/user.controller';

const router = express.Router();

router.get('/listallusers', getAllUsersController);
router.get('/user/:id', getUserByIdController); // ✅ new route
router.put('/updateuser/:id', updateUserController);
router.delete('/deleteuser/:id', deleteUserController);

export default router;
