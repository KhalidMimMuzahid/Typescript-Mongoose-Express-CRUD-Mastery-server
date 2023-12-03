import { TUser } from './user.interface';
import { User } from './user.model';

const createUserInToDB = async (userData: TUser) => {
  //   console.log({ userData });

  if (await User.isUserExists(userData?.userId)) {
    throw new Error('User already exists');
  }
  const user = new User(userData);
  const result = await user.save();

  return result;
};

export const userServices = { createUserInToDB };
