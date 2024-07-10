import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUser {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsString()
  bio: string;

  constructor(data: { userName: string; password: string; bio: string }) {
    this.userName = data.userName;
    this.password = data.password;
    this.bio = data.bio;
  }
}
