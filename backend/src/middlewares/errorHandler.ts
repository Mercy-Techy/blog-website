import { Request, Response, NextFunction } from "express";
import response from "../utility/response";

export default (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return response(res, 400, error.message);
};
