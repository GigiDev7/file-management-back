import FileSystemProvider from "./fileSystemProvider";
import FileModel from "../models/File";
import { getUserFilePath } from "../utils/getPath";
import crypto from "crypto";
import mongoose from "mongoose";

const fsProvider = new FileSystemProvider();

const getFiles = (userId: mongoose.Types.ObjectId, path: string) => {
  return FileModel.find({
    createdBy: userId,
    path,
  });
};

const uploadFile = async (
  userId: mongoose.Types.ObjectId,
  file: Express.Multer.File,
  filePath: string
) => {
  const fileContent = await fsProvider.readFile(file.path);
  const fileHash = crypto.createHash("md5").update(fileContent).digest("hex");
  const existingFile = await FileModel.findOne({ hash: fileHash });

  let fsPath = file.path;
  if (existingFile) {
    fsPath = existingFile.fsPath as string;
    await fsProvider.deleteFile(file.path);
  }

  const newFile = await FileModel.create({
    createdBy: userId,
    mimeType: file.mimetype,
    name: file.filename,
    path: filePath,
    size: file.size,
    hash: fileHash,
    fsPath,
  });

  return newFile;
};

const deleteFile = async (fileId: mongoose.Types.ObjectId) => {
  const file = await FileModel.findById(fileId);
  const fileHash = file?.hash;
  const fsPath = file?.fsPath;
  await file?.deleteOne();
  const referenceFile = await FileModel.findOne({ hash: fileHash });
  if (!referenceFile) {
    await fsProvider.deleteFile(fsPath as string);
  }
  //return FileModel.findByIdAndDelete(fileId);
};

const moveFile = (fileId: mongoose.Types.ObjectId, newPath: string) => {
  return FileModel.findByIdAndUpdate(fileId, { path: newPath });
};

const copyFile = async (fileId: mongoose.Types.ObjectId, newPath: string) => {
  const file = await FileModel.findById(fileId);
  if (file) {
    await FileModel.create({
      createdBy: file.createdBy,
      mimeType: file.mimeType,
      name: file.name,
      path: newPath,
      size: file.size,
      hash: file.hash,
      fsPath: file.fsPath,
    });
  }
};

const downloadFile = async (fileId: mongoose.Types.ObjectId) => {
  const file = await FileModel.findById(fileId);
  if (file) {
    return file.fsPath;
  }
};

const createFolder = (
  userId: mongoose.Types.ObjectId,
  path: string,
  folderName: string
) => {
  return FileModel.create({
    createdBy: userId,
    name: folderName,
    path,
  });
};

const deleteFolder = async (
  folderId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId
) => {
  const folder = await FileModel.findById(folderId);
  await FileModel.deleteMany({
    createdBy: userId,
    path: {
      $regex: `^${folder?.path?.length === 1 ? "/" : folder?.path + "/"}${
        folder?.name
      }`,
    },
  });
  await folder?.deleteOne();
};

const moveFolder = async (
  folderId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  newPath: string
) => {
  const folder = await FileModel.findById(folderId);
  if (folder) {
    const files = await FileModel.find({
      createdBy: userId,
      path: {
        $regex: `^${folder?.path}${
          folder.path?.length === 1 ? folder.name : "/" + folder.name
        }`,
      },
    });
    for (const f of files) {
      if (newPath.length === 1) {
        f.path = newPath + f.path?.slice(folder.path!.length + 1);
      } else {
        f.path = newPath + "/" + f.path?.slice(folder.path!.length);
      }

      await f.save();
    }
    folder.path = newPath;
    await folder?.save();
  }
};

const copyFolder = async (
  folderId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  newPath: string
) => {
  const folder = await FileModel.findById(folderId);
  if (folder) {
    const files = await FileModel.find({
      createdBy: userId,
      path: {
        $regex: `^${folder?.path}${
          folder.path?.length === 1 ? folder.name : "/" + folder.name
        }`,
      },
    });

    for (const f of files) {
      const newfileData: any = {
        createdBy: f.createdBy,
        name: f.name,
        path:
          newPath.length === 1
            ? newPath + f.path?.slice(folder.path!.length + 1)
            : (f.path = newPath + "/" + f.path?.slice(folder.path!.length)),
      };
      if (f.mimeType) newfileData.mimeType = f.mimeType;
      if (f.size) newfileData.size = f.size;
      if (f.hash) newfileData.hash = f.hash;
      if (f.fsPath) newfileData.fsPath = f.fsPath;

      await FileModel.create(newfileData);
    }
    await FileModel.create({
      createdBy: folder.createdBy,
      name: folder.name,
      path: newPath,
    });
  }
};

export default {
  uploadFile,
  moveFile,
  copyFile,
  deleteFile,
  moveFolder,
  deleteFolder,
  copyFolder,
  createFolder,
  getFiles,
  downloadFile,
};
