import cloudinary from "cloudinary";
import { Response, NextFunction } from "express";
import multer from "multer";

import { Req, servicereturntype } from "../types";
import response from "../utility/response";

const { config, uploader } = cloudinary.v2;

config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const parser = multer({ storage: multer.diskStorage({}) }).single(
  "image"
);

interface optionsType {
  resource_type: "auto" | "image" | "video" | "raw" | undefined;
  folder: string;
  public_id?: string;
}

export const fileUploader = async (
  path: string,
  public_id: string = ""
): Promise<servicereturntype> => {
  try {
    let options: optionsType = {
      resource_type: "auto",
      folder: "blog",
      public_id,
    };
    if (!public_id) delete options.public_id;
    const data = await uploader.upload(path, options);
    return { status: true, message: "Uploaded", data };
  } catch (error: any) {
    return { status: false, message: error.message, data: error };
  }
};

export const uploadFile = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.file);
    if (req.file) {
      if (!req.file.mimetype.includes("image")) {
        return response(res, 400, "File must be an image");
      }
      const { status, data } = await fileUploader(req.file?.path);
      if (status) {
        req.uploadedFile = { publicId: data.public_id, url: data.url };
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const deleteFile = async (
  publicId: string
): Promise<servicereturntype> => {
  try {
    await uploader.destroy(publicId, {
      resource_type: "image",
    });
    return { status: true, message: "File deleted", data: null };
  } catch (error: any) {
    return { status: false, message: error.message, data: null };
  }
};
