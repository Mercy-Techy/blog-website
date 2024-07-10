import { NextFunction, Response } from "express";
import { Req } from "../../types";
import { getUser, uploadProfilePicture } from "./user.service";
import response from "../../utility/response";

export const fetchUserDetails = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDetails = await getUser({ _id: req.user?._id });
    if (!userDetails.status) throw new Error(userDetails.message);
    return response(res, 200, "User details", userDetails.data);
  } catch (error) {
    next(error);
  }
};

export const uploadProfile = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
  try {
    const uploadDetails = await uploadProfilePicture(req);
    if (!uploadDetails.status) throw new Error(uploadDetails.message);
    return response(res, 200, uploadDetails.message, uploadDetails.data);
  } catch (error) {
    next(error);
  }
};
