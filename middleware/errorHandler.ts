import { Request, Response, NextFunction } from "express";
import Errors from "../enums/errorEnums";

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.code && err.code === 11000) {
    return res
      .status(409)
      .json({ message: err.message || "Email already registered" });
  } else if (err.name === Errors.AuthenticationError) {
    return res
      .status(401)
      .json({ message: err.message || "Authentication failed" });
  } else {
    return res
      .status(500)
      .json({ message: err.message || "Something went wrong" });
  }
}
