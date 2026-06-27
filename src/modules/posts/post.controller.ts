import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchasync";

// ---------create post
const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

// ---------get all post
const getAllPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
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
