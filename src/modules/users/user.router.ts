import { Router } from "express";
import { userController } from "./user.controller";

import { Role } from "../../../generated/prisma/enums";

import { auth } from "../../middleware/auth";

const router = Router();

router.post("/register", userController.registerController);

router.get(
  "/me",
  auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  userController.getMyProfile,
);

router.put(
  "/myprofile",
  auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  userController.updateProfile,
);

export const userRouter = router;
