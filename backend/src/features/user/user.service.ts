import { deleteFile } from "../../middlewares/fileHandler";
import { Req, servicereturntype } from "../../types";
import validator from "../../utility/validator";
import { CreateUser } from "./user.dto";
import { UserModel } from "./user.schema";

export const createUser = async (
  userDetails: CreateUser
): Promise<servicereturntype> => {
  try {
    const result = await validator(CreateUser, userDetails);
    if (!result.status) throw new Error(result.message);
    const existingUser = await UserModel.findOne({
      userName: userDetails.userName,
    });
    if (existingUser)
      throw new Error(`user name ${userDetails.userName} is not available`);
    const user = await UserModel.create({ ...userDetails });
    return { status: true, message: "User created", data: user };
  } catch (error: any) {
    return { status: false, message: error.message, data: null };
  }
};

export const getUser = async (
  filter: any,
  selectPassword: boolean = false
): Promise<servicereturntype> => {
  try {
    const select = selectPassword ? "+password" : "";
    const user = await UserModel.findOne(filter).select(select);
    if (!user)
      return { status: false, message: "User does not exist", data: null };
    return { status: true, message: "User details", data: user };
  } catch (error: any) {
    return { status: false, message: error.message, data: null };
  }
};

export const uploadProfilePicture = async (
  req: Req
): Promise<servicereturntype> => {
  try {
    const user = await UserModel.findById(req.user?._id);
    if (!user) throw new Error("User does not exist");
    if (req.uploadedFile) {
      console.log(req.uploadedFile);
      if (user.avatar) {
        await deleteFile(user.avatar.publicId);
      }
      user.avatar = req.uploadedFile;
      await user.save();
    }
    return { status: true, message: "Profile Picture Uploaded", data: user };
  } catch (error: any) {
    return { status: false, message: error.message, data: null };
  }
};
