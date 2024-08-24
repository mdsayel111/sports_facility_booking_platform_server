/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import isPasswordMatch from "../../../lib/bcrypt-ts/is-password-match";
import AppError from "../../custom-error/app-error";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";

// creat user service
const creatUser = async (payload: TUser) => {
  // do role = "user" forcefully, because user can't create admin account
  payload.role = "user"

  // creat user
  const user = await User.create(payload);

  // if user is null
  if (!user) {
    throw new AppError(400, "Failed to creat user !");
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  /* eslint-disable no-unused-vars */
  // delete isDeleted property by destucturing
  const { isDeleted, password, ...userInfo } = user.toObject();

  return userInfo;
};

// creat login srvice
const login = async (payload: Pick<TUser, "email" | "password">) => {
  // check if user exist or not
  const user = await User.findOne({ email: payload.email }).select(
    "+password +isDeleted",
  );

  // if user doesn't exist
  if (!user || user.isDeleted) {
    throw new AppError(403, "Email or password incorrect !");
  }

  // check if password match or not
  const isPassMatch = isPasswordMatch(payload.password, user.password);

  // if password doesn't match
  if (!isPassMatch) {
    throw new AppError(403, "Email or password incorrect !");
  }

  // delete password from response
  const { password, isDeleted, ...userInfo } = user.toObject();

  return userInfo;
};

// creat admin service
const createAdmin = async (payload: TUser) => {
  // do role = "admin" forcefully, because admin can create only admin account
  payload.role = "admin"

  // creat user
  const adminInfo = await User.create(payload);

  // if user is null
  if (!adminInfo) {
    throw new AppError(400, "Failed to creat user !");
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  /* eslint-disable no-unused-vars */
  // delete isDeleted property by destucturing
  const { isDeleted, password, ...userInfo } = adminInfo.toObject();

  return userInfo;
};

// auth services
const authService = {
  creatUser,
  login,
  createAdmin
};

export default authService;
