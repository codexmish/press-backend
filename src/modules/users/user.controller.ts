import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.service";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchasync";
import { sendResponse } from "../../utils/sendResponse";

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

export const userController = { registerController };
