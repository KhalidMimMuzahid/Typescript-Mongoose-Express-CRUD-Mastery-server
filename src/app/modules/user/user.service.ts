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
const getAllUsersFromDB = async () => {
  const result = await User.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 },
  );

  return result;
};
export const userServices = { createUserInToDB, getAllUsersFromDB };
