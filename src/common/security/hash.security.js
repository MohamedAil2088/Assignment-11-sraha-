import bcrypt from "bcrypt";
import { SALT } from "./../../config.js";
export const hash = async (plainText, saltRound = SALT, minor = "b") => {
  const saltSignature = await bcrypt.genSalt(saltRound, minor);
  const ciphrText = await bcrypt.hash(plainText, saltSignature);
  return ciphrText;
};


export const compare = async (plainText, ciphrText) => {
  const match = await bcrypt.compare(plainText,ciphrText)

  return match;
};