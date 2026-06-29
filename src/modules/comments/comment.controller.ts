import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchasync";
import { commentServices } from "./comment.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

// ---------create comment
const createComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await commentServices.createComment(req.body, req.user?.id as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "comment created successfullt",
      data: result,
    });
  },
);

// --------get comment by author id
const getCommentByAuthorId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

// --------get comment by comment id
const getCommentByCommentId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

// --------update comment
const updateComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

// --------delete comment
const deleteComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

// --------modarate comment
const moderateComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const commentCotroller = {
  createComment,
  getCommentByAuthorId,
  getCommentByCommentId,
  updateComment,
  deleteComment,
  moderateComment,
};
