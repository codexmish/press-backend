import { prisma } from "../../lib/prisma";
import { CreatePostPayload } from "./post.interface";

// ---------create post
const createPost = async (payload: CreatePostPayload, userID: string) => {
  const result = prisma.post.create({
    data:{
      ...payload,
      authorId: userID
    }
  })

  return result
};

// ---------get all post
const getAllPost = async () => {};

// ---------get post stats
const getPostStats = async () => {};

// ---------get my post
const getMyPosts = async () => {};

// ---------get post by id
const getPostsById = async () => {};

// ---------update post
const updatePost = async () => {};

// ---------delete post
const deletePost = async () => {};

export const postServices = {
  createPost,
  getAllPost,
  getPostStats,
  getMyPosts,
  getPostsById,
  updatePost,
  deletePost,
};
