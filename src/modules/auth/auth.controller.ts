import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchasync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

// ---------login controller
const loginController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // getting data
    const loginResult = await authService.loginUser(req.body);
    const { accessToken, refreshToken } = loginResult;

    // ----set token on cookies
    res.cookie("acc_tkn", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 23, //24 hour or 1 day
    });

    res.cookie("ref_tkn", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 23 * 7, //7 day
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "login successfull",
      data: loginResult,
    });
  },
);

// ---------refresh token controller
const refreshToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ref_tkn } = req.cookies;
    

    const { acc_tkn } = await authService.refreshToken(ref_tkn);

    res.cookie("acc_tkn", acc_tkn, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24, //1 day
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Token refreshed successfully",
      data: acc_tkn,
    });
  },
);

export const authController = { loginController, refreshToken };
