import { TRole } from "../app/modules/user/user.interface";

// Extend the JwtPayload interface
declare module "jsonwebtoken" {
  export interface JwtPayload {
    email: string;
    role: TRole;
  }
}

declare module "express-serve-static-core" {
  export interface Request {
    user?: {
      email: string;
      role: string;
    };
  }
}

declare module "../app/interface/test.interface.ts" {
  interface MyModule{
    email: string
  }
}
