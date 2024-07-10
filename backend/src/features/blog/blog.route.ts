import { Router } from "express";
import { parser, uploadFile } from "../../middlewares/fileHandler";
import {
  createBlog,
  deleteBlog,
  editBlog,
  fetchBlog,
  fetchBlogs,
} from "./blog.controller";
import authenticator from "../../middlewares/authenticator";

const router = Router();

router.post("/create", authenticator, parser, uploadFile, createBlog);
router.get("/", fetchBlogs);
router.get("/:blogId", fetchBlog);
router.put("/edit", authenticator, parser, uploadFile, editBlog);
router.delete("/:blogId", authenticator, deleteBlog);

export default router;
