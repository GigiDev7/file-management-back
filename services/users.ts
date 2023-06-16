import path from "path";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CustomError from "../utils/customError";
import FileSystemProvider from "./fileSystemProvider";
import Errors from "../enums/errorEnums";

const fsProvider = new FileSystemProvider();

interface UserData {
  email: string;
  password: string;
}

const registerUser = async (userData: UserData) => {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  const newUser = await User.create({
    email: userData.email,
    password: hashedPassword,
  });
  await fsProvider.createDirectory(
    path.join(process.cwd(), "public", "uploads", newUser._id.toString())
  );
};

const loginUser = async (userData: UserData) => {
  const user = await User.findOne({ email: userData.email });

  if (!user) {
    throw new CustomError("Authentication failed", Errors.AuthenticationError);
  }

  const isPasswordCorrect = await bcrypt.compare(
    userData.password,
    user.password
  );
  if (!isPasswordCorrect) {
    throw new CustomError("Authentication failed", Errors.AuthenticationError);
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
  return { email: user.email, token };
};

export default { registerUser, loginUser };
