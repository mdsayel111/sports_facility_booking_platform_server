import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
// creat deoded data function
const getDecodedData = async (tokenFromHeader: string) => {
  // extact token from  Bearer JWT_TOKEN this format
  const extactOrginalToken = tokenFromHeader.split(" ")[1];
  const decoded = jwt.verify(
    extactOrginalToken,
    config.secretKey as string,
  ) as JwtPayload;
  return decoded;
};

export default getDecodedData;
