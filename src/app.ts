import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./config";
import { userRouter } from "./modules/users/user.router";
import { authRouter } from "./modules/auth/auth.router";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: config.app_url,
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

export default app;
