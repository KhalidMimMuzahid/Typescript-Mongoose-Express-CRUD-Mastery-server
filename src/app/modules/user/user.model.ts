import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserModel,
} from './user.interface';
import config from '../../config';

// Schema
const addressSchema = new Schema<TAddress>({
  street: String,
  city: String,
  country: String,
});

const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: [true, 'firstName must be provided'] },
  lastName: { type: String, required: [true, 'lastName must be provided'] },
});

const orderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: [true, 'productName must be provided'],
  },
  price: { type: Number, required: [true, 'price must be provided'] },
  quantity: { type: Number, required: [true, 'quantity must be provided'] },
});

export const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    required: [true, 'userId must be provided'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'username must be provided'],
    unique: true,
  },
  password: { type: String, required: [true, 'password must be provided'] },
  fullName: {
    type: fullNameSchema,
    required: [true, 'fullName must be provided'],
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: [String],
  address: {
    type: addressSchema,
    required: true,
  },
  orders: {
    type: orderSchema,
  },
});

userSchema.statics.isUserExists = async (userId: number) => {
  const existingUser = User.findOne({ userId });
  return existingUser;
};

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias, no-unused-vars, @typescript-eslint/no-unused-vars
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.saltRound));
  next();
});
userSchema.post('save', async function (doc, next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias, no-unused-vars, @typescript-eslint/no-unused-vars

  doc.password = '';
  next();
});

// userSchema.pre('find', function (next) {
//   // console.log("This is this: ",this)
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });
// userSchema.pre('findOne', function (next) {
//   this.findOne({ isDeleted: { $ne: true } });
//   next();
// });

export const User = model<TUser, UserModel>('User', userSchema);