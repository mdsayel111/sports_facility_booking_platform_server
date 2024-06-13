import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";

// creat user service
const creatUser = async (payload: TUser) => {
  // creat user
  const user = await User.create(payload);
  return user;
};

// auth services
const authService = {
  creatUser,
};

export default authService;
