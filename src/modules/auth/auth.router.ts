import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/login", authController.loginController);
router.post("/refreshtoken", authController.refreshToken)

export const authRouter = router;
