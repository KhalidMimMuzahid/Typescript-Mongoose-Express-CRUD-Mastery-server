import { TUser } from './user.interface';
import { User } from './user.model';

const createUserInToDB = async (userData: TUser) => {
  //   console.log({ userData });

  if (await User.isUserExists(userData?.email)) {
    throw new Error('User already exists');
  }
  const user = new User(userData);
  const result = await user.save();

  return result;
};
const getAllUsersFromDB = async () => {
  const result = await User.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 },
  );

  return result;
};

const getUserByUserIdFromDB = async (userId: number) => {
  const result = await User.findUser(userId, {
    _id: 0,
    userId: 1,
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    isActive: 1,
    hobbies: 1,
    address: 1,
  });
  return result;
};
export const userServices = {
  createUserInToDB,
  getAllUsersFromDB,
  getUserByUserIdFromDB,
};
