import {
  prop,
  getModelForClass,
  pre,
  DocumentType,
} from "@typegoose/typegoose";
import * as bcrypt from "bcryptjs";

export class PictureObject {
  @prop({ required: true })
  publicId!: string;

  @prop({ required: true })
  url!: string;
}

@pre<User>("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 12);
  }
  next();
})
export class User {
  @prop({ required: true, trim: true })
  userName!: string;
  @prop({ required: true, trim: true, select: false })
  password!: string;
  @prop({ required: true })
  bio!: string;

  @prop({ _id: false })
  avatar?: PictureObject;
}

export const UserModel = getModelForClass(User);
export type UserDocument = DocumentType<User>;
