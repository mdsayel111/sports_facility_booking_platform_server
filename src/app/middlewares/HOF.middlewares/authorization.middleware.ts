import { RequestHandler } from "express";
import { JwtPayload } from "jsonwebtoken";
import getDecodedData from "../../../lib/jwt/get-deocode-data";
import AppError from "../../custom-error/app-error";
import { TRole } from "../../modules/user/user.interface";

// creat authorization HOF
const authorize = (...role: TRole[]) => {
  // creat authorize middleware
  const authorizeMiddleware: RequestHandler = async (req, res, next) => {
    try {
      const { token: tokenFromHeader } = req.headers;

      // if token didn't send in req headers
      if (!tokenFromHeader) {
        throw new AppError(403, "Unathorize");
      }

      // get decoded data
      const decoded = await getDecodedData(tokenFromHeader as string);

      // if decoded is null or decoded.role not include in the role param array throw error
      if (!decoded || !role.includes((decoded as JwtPayload).role)) {
        throw new AppError(403, "Unathorize");
      }

      // put the decoded data to req.user
      req.user = decoded

      // if user is authorize
      next();
    } catch (error) {
      // if any error occur
      next(error);
    }
  };

  // return validationHandler to use it as a middleware, and wrap it to catchAsync for catch async error
  return authorizeMiddleware;
};

export default authorize;
