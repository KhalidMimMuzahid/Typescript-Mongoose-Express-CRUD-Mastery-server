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
    default: 10000000,
  },
  username: {
    type: String,
    required: [true, 'username must be provided'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password must be provided'],

  },
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
  let userId = Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000);
  let userIdIsUnique = false;

  // generating the userId here,
  const reset = async () => {
    while (!userIdIsUnique) {
      const isDuplicated = await User.findOne({ userId: userId });
      if (!isDuplicated) {
        userIdIsUnique = true;
        // console.log("It's a unique Id")
      } else {
        userId = Math.floor(
          Math.random() * (99999999 - 10000000 + 1) + 10000000,
        );
      }
    }
  };
  reset();

  user.password = await bcrypt.hash(user.password, Number(config.saltRound));
  user.userId = userId;
  next();
});
userSchema.post('save', async function (doc, next) {
  //only the solution i have found to remove password field, though it through error on compile tile, but still it perfectly working on runtime
  doc.password = undefined;

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
