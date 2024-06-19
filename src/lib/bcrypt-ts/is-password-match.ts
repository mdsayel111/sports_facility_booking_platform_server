import bcrypt from "bcrypt";

// creat passwor check function
const isPasswordMatch = async (password: string, hashPassword: string) => {
  const isMatch = await bcrypt.compare(password, hashPassword);
  return isMatch;
};

export default isPasswordMatch;
