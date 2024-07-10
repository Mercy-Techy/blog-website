import jwt from "jsonwebtoken";

import { jwtPayload } from "../types";

const { JWT_SECRET, JWT_EXPIRY } = process.env;

export const signJWT = (payload: jwtPayload) => {
  const token = jwt.sign(payload, String(JWT_SECRET), {
    expiresIn: JWT_EXPIRY,
  });
  return token;
};

export const decodeJWT = (token: string): any => {
  const decoded = jwt.verify(token, String(JWT_SECRET));
  return decoded;
};
