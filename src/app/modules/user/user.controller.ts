/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await userServices.createUserInToDB(user);
    res.json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.json({
      success: false,
      message: "User couldn't save!",
      error: {
        code: 404,
        description: error?.message || "User couldn't save!",
        error: error,
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();

    res.json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error?.message || 'User not found',
        error: error,
      },
    });
  }
};

export const userController = { createUser, getAllUsers };
