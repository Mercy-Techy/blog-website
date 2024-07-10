import { IsDate, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  constructor(data: { title: string; content: string }) {
    this.title = data.title;
    this.content = data.content;
  }
}

export class EditBlogDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsMongoId()
  blogId: Types.ObjectId;

  constructor(data: {
    title: string;
    content: string;
    blogId: Types.ObjectId;
  }) {
    this.title = data.title;
    this.content = data.content;
    this.blogId = data.blogId;
  }
}
