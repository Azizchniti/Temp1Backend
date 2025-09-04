import { Request, Response } from 'express';
import {getUserById, getAllUsers, updateUser, deleteUser } from '../services/user.service';

export const getAllUsersController = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to retrieve users' });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  

  try {
    const updated = await updateUser(id, updatedData);
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to update user' });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await deleteUser(id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to delete user' });
  }
};
export const getUserByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);
    if (!user) {
       res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to retrieve user' });
  }
};