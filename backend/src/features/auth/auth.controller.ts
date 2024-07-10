import { NextFunction, Request, Response } from "express";
import validator from "../../utility/validator";
import { CreateUser } from "../user/user.dto";
import response from "../../utility/response";
import { createUser, getUser } from "../user/user.service";
import * as bcrypt from "bcryptjs";
import { signJWT } from "../../utility/jwt";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDetails = await createUser(req.body);
    if (!userDetails.status) throw new Error(userDetails.message);
    return response(res, 201, "Signup Successful", userDetails.data);
  } catch (error: any) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUser({ userName: req.body.userName }, true);
    if (!user.status)
      throw new Error("You do not have an account with us, kindly sign up");
    const passwordMatches = bcrypt.compareSync(
      req.body.password,
      user.data.password
    );
    if (!passwordMatches) throw new Error("Invalid Password");
    const token = signJWT({ _id: user.data._id });
    const { password, ...rest } = user.data.toObject();
    return response(res, 200, "Welcome to daily reflections", {
      user: rest,
      token,
    });
  } catch (error: any) {
    next(error);
  }
};

//profile update
