import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchasync";
import { postServices } from "./post.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

// ---------create post
const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const payload = req.body;

    const result = await postServices.createPost(payload, id as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "post created",
      data: result,
    });
  },
);

// ---------get all post
const getAllPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await postServices.getAllPost();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "all posts",
      data: posts,
    });
  },
);

// ---------get post stats
const getPostStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

// ---------get my posts
const getMyPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

// ---------get posts by id
const getPostsById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

// ---------update post
const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

// ----------delete post

const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const postController = {
  createPost,
  getAllPost,
  getPostStats,
  getMyPosts,
  getPostsById,
  updatePost,
  deletePost,
};
