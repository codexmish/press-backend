import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.service";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchasync";
import { sendResponse } from "../../utils/sendResponse";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";

// ----register

const registerController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.registerServices(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "user registered successfully",
      data: user,
    });
  },
);

// ----get profile
const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { acc_tkn } = req.cookies;

    // -----verify token
    const verifiedToken = jwtUtils.verifiyToken(
      acc_tkn,
      config.jwt_access_secret as string,
    );

    if (typeof verifiedToken === "string") {
      throw new Error(verifiedToken);
    }

    const profile = await userServices.getMyProfile(verifiedToken.id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "user profile found",
      data: profile,
    });
  },
);

export const userController = { registerController, getMyProfile };
