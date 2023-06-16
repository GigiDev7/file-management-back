import { Request, Response, NextFunction } from "express";
import userService from "../services/users";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, token } = await userService.loginUser(req.body);
    res.status(200).json({ email, token });
  } catch (error) {
    next(error);
  }
};

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userService.registerUser(req.body);
    res.status(201).json({ msg: "User registration successful" });
  } catch (error) {
    next(error);
  }
};

export default { loginUser, registerUser };
