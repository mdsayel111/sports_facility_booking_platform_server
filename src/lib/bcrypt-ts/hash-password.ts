import config from "../../config";
import bcrypt from "bcrypt";

// creat hash password function
const hashPassword = async (passwoer: string) => {
  const salt = parseInt(config.salt as string);
  const hashedPassword = await bcrypt.hash(passwoer, salt);
  return hashedPassword;
};

export default hashPassword;
