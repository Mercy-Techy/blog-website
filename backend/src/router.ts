import { Router } from "express";
import authRouter from "./features/auth/auth.route";
import blogRouter from "./features/blog/blog.route";
import userRouter from "./features/user/user.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/blog", blogRouter);
router.use("/user", userRouter);

export default router;
