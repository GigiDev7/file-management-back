import { Request, Response, NextFunction, query } from "express";
import FileSystemProvider from "../services/fileSystemProvider";
import { getUserFilePath } from "../utils/getPath";
import fileService from "../services/files";

const fsProvider = new FileSystemProvider();

const getUserDirs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id as string;
    const queryPath = req.query.p?.toString() || "";
    const dirPath = getUserFilePath(userId, queryPath);
    const result = await fsProvider.listDirectory(dirPath);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createFolder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id as string;
    const queryPath = req.query.p?.toString() || "";
    const dirPath = getUserFilePath(userId, queryPath, req.body.folderName);
    await fsProvider.createDirectory(dirPath);
    res.status(201).json({ message: "Folder created" });
  } catch (error) {
    next(error);
  }
};

const deleteFolder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id as string;
    const queryPath = req.query.p?.toString() || "";
    const dirPath = getUserFilePath(userId, queryPath, req.body.folderName);
    await fsProvider.deleteDirectory(dirPath);
    res.status(201).json({ message: "Folder deleted" });
  } catch (error) {
    next(error);
  }
};

const moveFolder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id as string;
    const srcPath = getUserFilePath(userId, req.body.sourcePath);
    const destPath = getUserFilePath(userId, req.body.destinationPath);
    await fsProvider.moveDirectory(srcPath, destPath);
    res.status(200).json({ message: "Successfully moved folder" });
  } catch (error) {
    next(error);
  }
};

const copyFolder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id as string;
    const srcPath = getUserFilePath(userId, req.body.sourcePath);
    const destPath = getUserFilePath(userId, req.body.destinationPath);
    await fsProvider.copyDirectory(srcPath, destPath);
    res.status(200).json({ message: "Successfully moved folder" });
  } catch (error) {
    next(error);
  }
};

const downloadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id as string;
    const queryPath = req.query.p?.toString() || "";
    const filePath = getUserFilePath(userId, queryPath);
    res.download(filePath);
  } catch (error) {
    next(error);
  }
};

const deleteFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id as string;
    const filePath = getUserFilePath(userId, req.body.filePath);
    await fsProvider.deleteFile(filePath);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const copyFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id as string;
    const srcPath = getUserFilePath(userId, req.body.sourcePath);
    const destPath = getUserFilePath(userId, req.body.destinationPath);
    await fsProvider.copyFile(srcPath, destPath);
    res.status(200).json({ message: "File copied successfully" });
  } catch (error) {
    next(error);
  }
};

const moveFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id as string;
    const srcPath = getUserFilePath(userId, req.body.sourcePath);
    const destPath = getUserFilePath(userId, req.body.destinationPath);
    await fsProvider.moveFile(srcPath, destPath);
    res.status(200).json({ message: "File copied successfully" });
  } catch (error) {
    next(error);
  }
};

const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id as string;
    await fileService.uploadFile(userId, req.file!);
    res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    next(error);
  }
};

export default {
  getUserDirs,
  createFolder,
  deleteFolder,
  moveFolder,
  copyFolder,
  downloadFile,
  deleteFile,
  copyFile,
  moveFile,
  uploadFile,
};
