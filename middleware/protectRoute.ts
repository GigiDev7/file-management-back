import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, decode } from "jsonwebtoken";
import User from "../models/User";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization || !req.headers.authorization.split(" ")[1]) {
    return res.status(401).json({ message: "Authentication Failed" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET as string);
    const userId = (decodedData as jwt.JwtPayload).id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Authentication Failed" });
    }
    req.user = { _id: user._id.toString(), email: user.email };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication Failed" });
  }
}
