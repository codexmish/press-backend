import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./config";
import { userRouter } from "./modules/users/user.router";
import { authRouter } from "./modules/auth/auth.router";
import { posstRouter } from "./modules/posts/post.router";
import { commentRouter } from "./modules/comments/comment.router";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: config.app_url,
  }),
);


// ---------routes

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", posstRouter)
app.use("/api/comments", commentRouter)

export default app;
