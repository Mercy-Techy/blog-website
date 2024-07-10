import { NextFunction, Response } from "express";
import { Req } from "../../types";
import {
  createBlogService,
  deleteBlogService,
  editBlogService,
} from "./blog.service";
import response from "../../utility/response";
import { deleteFile } from "../../middlewares/fileHandler";
import paginator from "../../utility/paginator";
import { BlogModel } from "./blog.schema";

export const createBlog = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.uploadedFile) throw new Error("Blog image was not uploaded");
    const blogDetails = await createBlogService(
      req.body,
      req.uploadedFile,
      req.user?._id
    );
    if (!blogDetails.status) {
      await deleteFile(req.uploadedFile.publicId);
      throw new Error(blogDetails.message);
    }
    return response(res, 200, "Blog created", blogDetails.data);
  } catch (error: any) {
    next(error);
  }
};

export const fetchBlogs = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
  let page = req.query.page ? +req.query.page : 1;
  let limit = req.query.limit ? +req.query.limit : 10;
  return await paginator(res, next, "Blogs", BlogModel, page, limit);
};

export const fetchBlog = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await BlogModel.findOne({
      _id: req.params.blogId,
    });
    if (!blog) throw new Error("Blog does not exist");
    return response(res, 200, "Blog", blog);
  } catch (error) {
    next(error);
  }
};

export const editBlog = async (req: Req, res: Response, next: NextFunction) => {
  try {
    const editDetails = await editBlogService(
      req.body,
      req?.uploadedFile,
      req?.user?._id
    );
    if (!editDetails.status) throw new Error(editDetails.message);
    return response(res, 200, "Blog Edited", editDetails.data);
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleteDetails = await deleteBlogService(
      req.params.blogId,
      req.user?._id
    );
    if (!deleteDetails.status) throw new Error(deleteDetails.message);
    return response(res, 200, "Blog deleted");
  } catch (error) {
    next(error);
  }
};
