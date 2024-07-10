import { validate } from "class-validator";
import { servicereturntype } from "../types";

export default async (Class: any, data: any): Promise<servicereturntype> => {
  try {
    const classData = new Class({ ...data });
    const errors = await validate(classData);
    if (errors.length > 0) {
      const error = Object.values(errors[0]?.constraints || {})[0];
      return {
        status: false,
        message: error || "Invalid credentials",
        data: null,
      };
    }
    return { status: true, message: "verified", data: null };
  } catch (error: any) {
    return { status: false, message: error.message, data: null };
  }
};
