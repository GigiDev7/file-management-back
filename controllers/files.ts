import { Request, Response, NextFunction, query } from "express";
import FileSystemProvider from "../services/fileSystemProvider";
import fileService from "../services/files";
import mongoose from "mongoose";

const getUserFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user?._id);
    const queryPath = req.query.p?.toString() || "/";
    const result = await fileService.getFiles(userId, queryPath);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user?._id);
    await fileService.uploadFile(userId, req.file!, req.body.filePath);
    res.status(200).json({ message: "File uploaded successfully" });
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
    const fileId = new mongoose.Types.ObjectId(req.params.fileId);
    const filePath = await fileService.downloadFile(fileId);
    res.download(filePath!);
  } catch (error) {
    next(error);
  }
};

const deleteFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.fileId);
    await fileService.deleteFile(fileId);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const copyFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.fileId);
    const newPath = req.body.path;
    await fileService.copyFile(fileId, newPath);
    res.status(200).json({ message: "File copied successfully" });
  } catch (error) {
    next(error);
  }
};

const moveFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.fileId);
    const newPath = req.body.path;
    await fileService.moveFile(fileId, newPath);
    res.status(200).json({ message: "File copied successfully" });
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
    const userId = new mongoose.Types.ObjectId(req.user?._id);
    const path = req.body.path;
    const folderName = req.body.folderName;
    await fileService.createFolder(userId, path, folderName);
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
    const userId = new mongoose.Types.ObjectId(req.user?._id);
    const folderId = new mongoose.Types.ObjectId(req.params.folderId);
    await fileService.deleteFolder(folderId, userId);
    res.status(201).json({ message: "Folder deleted" });
  } catch (error) {
    next(error);
  }
};

const moveFolder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user?._id);
    const folderId = new mongoose.Types.ObjectId(req.params.folderId);
    const newPath = req.body.path;
    await fileService.moveFolder(folderId, userId, newPath);
    res.status(200).json({ message: "Successfully moved folder" });
  } catch (error) {
    next(error);
  }
};

const copyFolder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user?._id);
    const folderId = new mongoose.Types.ObjectId(req.params.folderId);
    const newPath = req.body.path;
    await fileService.copyFolder(folderId, userId, newPath);
    res.status(200).json({ message: "Successfully moved folder" });
  } catch (error) {
    next(error);
  }
};

export default {
  getUserFiles,
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
