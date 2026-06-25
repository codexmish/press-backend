import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import { catchAsync } from "../utils/catchasync";
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import { prisma } from "../lib/prisma";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        name: string;
        id: string;
        role: Role;
      };
    }
  }
}

export const auth = (...requiredRoles: Role[]) => {
  return catchAsync(
    async (req: Request, resizeBy: Response, next: NextFunction) => {
      const acc_tkn = req.cookies.acc_tkn;

      if (!acc_tkn) {
        throw new Error("you are not logged in");
      }

      const verifiedToken = jwtUtils.verifiyToken(
        acc_tkn,
        config.jwt_access_secret as string,
      );

      if (!verifiedToken.success) {
        throw new Error(verifiedToken.error);
      }

      const { email, name, id, role } = verifiedToken.data as JwtPayload;

      if (!requiredRoles.includes(role)) {
        throw new Error("Forbidden");
      }

      const user = prisma.user.findUniqueOrThrow({
        where: {
          id,
          email,
          name,
        },
      });

      if (!user) {
        throw new Error("Unauthorized request");
      }

      if ((await user).activeStatus === "DEACTIVE") {
        throw new Error("Your account has been blocked");
      }

      req.user = {
        email,
        name,
        id,
        role,
      };

      next();
    },
  );
};
