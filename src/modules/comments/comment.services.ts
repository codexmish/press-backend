import { prisma } from "../../lib/prisma";
import { CommentPayloaddd } from "./comment.interface";

// ---------create comment
const createComment = async (payload: CommentPayloaddd, authorId: string) => {
  const { content, postId } = payload;

  const comment = await prisma.comment.create({
    data:{
      content,
      authorId,
      postId
    },
  })

  return comment
};

// ---------get Comment By AuthorId
const getCommentByAuthorId = async () => {};

// ---------get Comment By CommentId
const getCommentByCommentId = async () => {};

// ---------update Comment
const updateComment = async () => {};

// ---------delete Comment
const deleteComment = async () => {};

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
