import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { commentCotroller } from "./comment.controller";

const router = Router();

router.post(
  "/",
  auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  commentCotroller.createComment,
);

router.get("/author/:authorId", commentCotroller.getCommentByAuthorId);
router.get("/:commentId", commentCotroller.getCommentByCommentId);
router.put(
  "/:commentId",
  auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  commentCotroller.updateComment,
);
router.delete(
  "/:commentId",
  auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  commentCotroller.deleteComment,
);
router.put(
  "/:commentId/moderate",
  auth(Role.ADMIN),
  commentCotroller.moderateComment,
);

export const commentRouter = router;
