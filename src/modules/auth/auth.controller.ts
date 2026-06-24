// ---------login controller

import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchasync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const loginController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginResult = await authService.loginUser(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "login successfull",
      data: loginResult,
    });
  },
);

export const authController = { loginController };
