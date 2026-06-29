import { CommentStatus, PostStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { CreatePostPayload, IupdatePostPayload } from "./post.interface";

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
const getPostStats = async () => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const totalpost = await tx.post.count();

    const totalPublishedPost = await tx.post.count({
      where: {
        status: PostStatus.PUBLISHD,
      },
    });

    const totalDraftPost = await tx.post.count({
      where: {
        status: PostStatus.DRAFT,
      },
    });

    const totalArchivedPost = await tx.post.count({
      where: {
        status: PostStatus.ARCHIVED,
      },
    });

    const totalComments = await tx.comment.count();

    const totalApprovedComments = await tx.comment.count({
      where: {
        status: CommentStatus.APPROVED,
      },
    });

    const totalRejectedComments = await tx.comment.count({
      where: {
        status: CommentStatus.REJECT,
      },
    });

    const totalViewsAggrigate = await tx.post.aggregate({
      _sum: {
        views: true
      }
    })

    const totalViews = totalViewsAggrigate._sum.views

    return {
      totalpost,
      totalPublishedPost,
      totalDraftPost,
      totalArchivedPost,
      totalComments,
      totalApprovedComments,
      totalRejectedComments,
      totalViews
    };
  });

  return transactionResult;
};

// ---------get my post
const getMyPosts = async (authorId: string) => {
  const result = await prisma.post.findMany({
    where: {
      authorId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      comments: true,
      author: {
        omit: {
          password: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  return result;
};

// ---------get post by id
const getPostsById = async (postId: string) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: {
        id: postId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    const post = await tx.post.findUniqueOrThrow({
      where: {
        id: postId,
      },
      include: {
        author: {
          omit: {
            password: true,
          },
        },
        comments: {
          where: {
            status: CommentStatus.APPROVED,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    return post;
  });

  return transactionResult;

  // await prisma.post.update({
  //   where: {
  //     id: postId,
  //   },
  //   data: {
  //     views: {
  //       increment: 1,
  //     },
  //   },
  // });

  // const post = await prisma.post.findUniqueOrThrow({
  //   where: {
  //     id: postId,
  //   },
  //   include: {
  //     author: {
  //       omit: {
  //         password: true,
  //       },
  //     },
  //     comments: {
  //       where: {
  //         status: CommentStatus.APPROVED,
  //       },
  //       orderBy: {
  //         createdAt: "desc",
  //       },
  //     },
  //     _count: {
  //       select: {
  //         comments: true,
  //       },
  //     },
  //   },
  // });

  // return post;
};

// ---------update post
const updatePost = async (
  pastId: string,
  patload: IupdatePostPayload,
  authorId: string,
  isAdmin: boolean,
) => {
  const post = await prisma.post.findFirstOrThrow({
    where: {
      id: pastId,
    },
  });

  if (!isAdmin && post.authorId !== authorId) {
    throw new Error("Not perimted");
  }

  const result = prisma.post.update({
    where: {
      id: pastId,
    },
    data: patload,
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });

  return result;
};

// ---------delete post
const deletePost = async (
  pastId: string,
  authorId: string,
  isAdmin: boolean,
) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: pastId,
    },
  });

  if (!isAdmin && post.authorId !== authorId) {
    throw new Error("Not perimted");
  }

  const result = await prisma.post.delete({
    where: {
      id: pastId,
    },
  });
};

export const postServices = {
  createPost,
  getAllPost,
  getPostStats,
  getMyPosts,
  getPostsById,
  updatePost,
  deletePost,
};
