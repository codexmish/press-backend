import { prisma } from "../../lib/prisma";
import { CommentPayloaddd, CommentupdatePayloaddd } from "./comment.interface";

// ---------create comment
const createComment = async (payload: CommentPayloaddd, authorId: string) => {
  const { content, postId } = payload;

  const comment = await prisma.comment.create({
    data: {
      content,
      authorId,
      postId,
    },
  });

  return comment;
};

// ---------get Comment By AuthorId
const getCommentByAuthorId = async (authorId: string) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const comment = tx.comment.findMany({
      where: {
        authorId,
      },
    });

    return comment;
  });
  return transactionResult;
};

// ---------get Comment By CommentId
const getCommentByCommentId = async (commentid: string) => {
  const result = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentid,
    },
  });

  return result;
};

// ---------update Comment
const updateComment = async (
  authorId: string,
  patload: CommentupdatePayloaddd,
  commentId: string,
) => {
  const { content } = patload;

  const comment = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
    },
  });

  if (comment.authorId !== authorId) {
    throw new Error("you are not authorized for this");
  }

  const updatedComment = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: patload,
  });

  return updatedComment;
};

// ---------delete Comment
const deleteComment = async (
  commentId: string,
  authorId: string,
  isAdmin: boolean,
) => {
  const comment = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
    },
  });

  if (comment.authorId !== authorId && !isAdmin) {
    throw new Error("you are not authorized for this");
  }

  const result = prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
};

// ---------moderate Comment
const moderateComment = async () => {};

export const commentServices = {
  createComment,
  getCommentByAuthorId,
  getCommentByCommentId,
  updateComment,
  deleteComment,
  moderateComment,
};
