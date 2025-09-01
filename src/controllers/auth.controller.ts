import { Request, Response } from 'express';
import * as userService from '../services/auth.service';

// Register User Controller
export const signUpUserController = async (req: Request, res: Response) => {
  try {
    const { email, password, role, firstName, lastName, upline_id } = req.body;
    const user = await userService.signUpUser(email, password, role, firstName, lastName, upline_id);
    res.status(201).json({ message: 'User signed up successfully', user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


// Login User Controller
export const signInUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await userService.signInUser(email, password);
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Login error:", error.message);  // Log the real cause
    res.status(401).json({ error: error.message });
  }
};


// Get Current User by Token Controller
export const getCurrentUserController = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No token provided');
    const user = await userService.getCurrentUser(token);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

// Logout Controller
export const logoutUserController = async (_req: Request, res: Response) => {
  try {
    const result = await userService.logoutUser();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
// In auth.controller.ts
export const inviteUserController = async (req: Request, res: Response) => {
  try {
    const { email, role, firstName, lastName, upline_id, cpf, phone } = req.body;
    const result = await userService.inviteUser(email, role, firstName, lastName, upline_id, cpf, phone);
    res.status(200).json({ message: "Invite sent", data: result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const changePasswordController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { newPassword } = req.body;

    if (!userId || !newPassword) {
      res.status(400).json({ error: "Dados incompletos." }); // ✅ FIXED
    }

    const result = await userService.changePassword(userId as string, newPassword);
     res.status(200).json(result); // optional but consistent
  } catch (error: any) {
     res.status(400).json({ error: error.message }); // ✅ also return here
  }
};

// In auth.controller.ts
export const requestPasswordResetController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
 if (!email) {
  res.status(400).json({ error: "E-mail é obrigatório." }); // ✅ no return
}

    const result = await userService.requestPasswordReset(email);
     res.status(200).json(result);
  } catch (error: any) {
     res.status(400).json({ error: error.message });
  }
};

