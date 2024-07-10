import {
  prop,
  getModelForClass,
  DocumentType,
  modelOptions,
} from "@typegoose/typegoose";
import { PictureObject } from "../user/user.schema";
import { Types } from "mongoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Blog {
  @prop({ required: true })
  title!: string;
  @prop({ required: true })
  content!: string;
  @prop({ _id: false, required: true })
  image?: PictureObject;
  @prop({ required: true })
  createdBy!: Types.ObjectId;
}

export const BlogModel = getModelForClass(Blog);
export type BlogDocument = DocumentType<Blog>;
