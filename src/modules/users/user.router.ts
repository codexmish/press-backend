import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post("/register", userController.registerController);
router.get("/me", userController.getMyProfile);

export const userRouter = router;
