import validator from "../../utility/validator";
import { CreateBlogDto, EditBlogDto } from "./blog.dto";
import { BlogModel } from "./blog.schema";
import { servicereturntype, uploadedFileType } from "../../types";
import { Types } from "mongoose";
import { deleteFile } from "../../middlewares/fileHandler";

export const createBlogService = async (
  blogDetails: CreateBlogDto,
  blogImage: uploadedFileType,
  createdBy?: Types.ObjectId
): Promise<servicereturntype> => {
  try {
    const result = await validator(CreateBlogDto, blogDetails);
    if (!result.status) throw new Error(result.message);
    const blog = await BlogModel.create({
      ...blogDetails,
      image: blogImage,
      createdBy,
    });
    return { status: true, message: "Blog created", data: blog };
  } catch (error: any) {
    return { status: false, message: error.message, data: null };
  }
};

export const editBlogService = async (
  blogDetails: EditBlogDto,
  blogImage?: uploadedFileType,
  createdBy?: Types.ObjectId
): Promise<servicereturntype> => {
  try {
    const result = await validator(EditBlogDto, blogDetails);
    if (!result.status) throw new Error(result.message);
    const blog = await BlogModel.findOne({
      _id: blogDetails.blogId,
      createdBy,
    });
    if (!blog) throw new Error("Blog does not exist");
    if (blogImage && blog.image) {
      await deleteFile(blog.image?.publicId);
    } else {
      blogImage = blog.image;
    }
    const updatedBlog = await BlogModel.findOneAndUpdate(
      { _id: blog._id, createdBy },
      { ...blogDetails, image: blogImage },
      { new: true }
    );
    return { status: true, message: "Blog created", data: updatedBlog };
  } catch (error: any) {
    return { status: false, message: error.message, data: null };
  }
};

export const deleteBlogService = async (
  blogId: string,
  createdBy?: Types.ObjectId
) => {
  try {
    const blog = await BlogModel.findOneAndDelete({ _id: blogId, createdBy });
    if (blog?.image) {
      await deleteFile(blog.image.publicId);
    }
    return { status: true, message: "Blog deleted", data: null };
  } catch (error: any) {
    return { status: false, message: error.message, data: null };
  }
};
