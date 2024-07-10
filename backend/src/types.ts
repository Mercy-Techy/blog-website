import { Schema } from "mongoose";
import { Request } from "express";
import { UserDocument } from "./features/user/user.schema";

export interface servicereturntype {
  status: boolean;
  message: string;
  data: any;
}
export type mongooseId = Schema.Types.ObjectId;

export interface jwtPayload {
  _id: mongooseId;
}

export interface uploadedFileType {
  publicId: string;
  url: string;
}

export interface file {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
let filee: Request;

export interface Req extends Request {
  user?: UserDocument;
  uploadedFile?: uploadedFileType;
}
