import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserByUserId);
router.put('/:userId', userController.updateUserByUserId);
router.delete('/:userId', userController.deleteUserByUserId);
export const userRoutes = router;
