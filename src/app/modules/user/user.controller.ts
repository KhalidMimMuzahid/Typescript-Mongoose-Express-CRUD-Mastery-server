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
      },
    });
  }
};
const getUserByUserId = async (req: Request, res: Response) => {
  try {
    const userId = Number(req?.params?.userId);
    const user = await userServices.getUserByUserIdFromDB(userId);
    if (!user) {
      throw new Error('User not found');
    }
    res.json({
      success: true,
      message: 'Users fetched successfully!',
      data: user,
    });
  } catch (error: any) {
    res.json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error?.message || 'User not found',
      },
    });
  }
};

const updateUserByUserId = async (req: Request, res: Response) => {
  try {
    const userId = Number(req?.params?.userId);
    const userData = req?.body;
    const user = await userServices.updateUserByUserIdToDB(userId, userData);
    if (!user) {
      throw new Error('User not found');
    }

    console.log({ user });
    res.json({
      success: true,
      message: 'User updated successfully!',
      data: user,
    });
  } catch (error: any) {
    res.json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error?.message || 'User not found',
      },
    });
  }
};

const deleteUserByUserId = async (req: Request, res: Response) => {
  try {
    const userId = Number(req?.params?.userId);
    const user = await userServices.deleteUserByUserIdFromDB(userId);

    console.log({ user });
    if (!user) {
      throw new Error('User not found');
    }

    console.log({ user });
    res.json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error?.message || 'User not found',
      },
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getUserByUserId,
  updateUserByUserId,
  deleteUserByUserId,
};
