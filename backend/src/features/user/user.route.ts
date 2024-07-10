import { Router } from "express";
import { fetchUserDetails, uploadProfile } from "./user.controller";
import authenticator from "../../middlewares/authenticator";
import { parser, uploadFile } from "../../middlewares/fileHandler";

const router = Router();

router.get("/", authenticator, fetchUserDetails);

router.post(
  "/upload-profile-picture",
  authenticator,
  parser,
  uploadFile,
  uploadProfile
);

export default router;
