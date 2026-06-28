import { prisma } from "../../lib/prisma";
import { CreatePostPayload } from "./post.interface";

// ---------create post
const createPost = async (payload: CreatePostPayload, userID: string) => {
  const result = prisma.post.create({
    data: {
      ...payload,
      authorId: userID,
    },
  });

  return result;
};

// ---------get all post
const getAllPost = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        omit: {
          password: true,
          createdAt: true,
          updatedAt: true,
          activeStatus: true,
          email: true,
        },
      },
      comments: true,
    },
  });

  return posts;
};

// ---------get post stats
const getPostStats = async () => {};

// ---------get my post
const getMyPosts = async () => {};

// ---------get post by id
const getPostsById = async (postId: string) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      views: {
        increment: 1,
      },
    },
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });

  return updatedPost;
};

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
