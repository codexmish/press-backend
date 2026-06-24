import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.service";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchasync";



// ----register
// const registerController = async (req: Request, res: Response) => {
//   try {
//     const user = await userServices.registerServices(req.body);

//     res.status(httpStatus.CREATED).json({
//       success: true,
//       statuscode: httpStatus.CREATED,
//       message: "user registered successfully",
//       data: user,
//     });
//   } catch (error) {

//     res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//       success: false,
//       statusCode: httpStatus.INTERNAL_SERVER_ERROR,
//       message: (error as Error).message,
//       error: error,
//     });
//   }
// };

const registerController = catchAsync(async (req: Request, res: Response, next: NextFunction) =>{
  const user = await userServices.registerServices(req.body);


  res.status(httpStatus.CREATED).json({
      success: true,
      statuscode: httpStatus.CREATED,
      message: "user registered successfully",
      data: user,
    });
})

export const userController = { registerController };
