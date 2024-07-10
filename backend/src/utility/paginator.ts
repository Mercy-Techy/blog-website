import { Model } from "mongoose";
import response from "./response";
import { NextFunction, Response } from "express";

export default async (
  res: Response,
  next: NextFunction,
  title: string,
  model: Model<any>,
  page: number = 1,
  limit: number = 10,
  populate: any = null,
  filter: any = {},
  sort: any = null,
  select: any = null
) => {
  try {
    const skip = (page - 1) * limit;
    const totalItems = await model.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);
    const data = await model
      .find(filter)
      .select(select)
      .populate(populate)
      .sort(sort || { createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
    return response(res, 200, title, {
      totalItems,
      totalPages,
      data,
    });
  } catch (error) {
    next(error);
  }
};
