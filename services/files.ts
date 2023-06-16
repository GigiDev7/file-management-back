import FileSystemProvider from "./fileSystemProvider";
import FileModel from "../models/File";
import { getUserFilePath } from "../utils/getPath";
import crypto from "crypto";

const fsProvider = new FileSystemProvider();

const uploadFile = async (userId: string, file: Express.Multer.File) => {
  const fileContent = await fsProvider.readFile(file.path);
  const fileHash = crypto.createHash("md5").update(fileContent).digest("hex");

  // Don't upload file if the file with same content already exists, just add new path in DB
  /* const existingFile = await FileModel.findOne({ hash: fileHash });
   if (existingFile) {
    await fsProvider.deleteFile(file.path);
    existingFile.path.push(file.path)
    await existingFile.save()
    return;
  }  */

  const newFile = await FileModel.create({
    content: fileContent,
    createdBy: userId,
    mimeType: file.mimetype,
    name: file.filename,
    path: [file.path],
    size: file.size,
    hash: fileHash,
  });
  return newFile;
};

const deleteFile = async (filePath: string, userId: string) => {
  const file = await FileModel.findOne({
    createdBy: userId,
    path: { $all: [filePath] },
  });
  if (file) {
    file.path = file.path.filter((fp) => fp !== filePath);
    if (file.path.length) {
      await file.save();
    } else {
      await file.deleteOne();
    }
  }
};

const copyFile = async (srcPath: string, desPath: string, userId: string) => {
  const file = await FileModel.findOne({
    createdBy: userId,
    path: { $all: [srcPath] },
  });
  if (file) {
    file.path.push(desPath);
    await file.save();
  }
};

const moveFile = async (srcPath: string, destPath: string, userId: string) => {
  const file = await FileModel.findOne({
    createdBy: userId,
    path: { $all: [srcPath] },
  });
  if (file) {
    const ind = file.path.findIndex((fp) => fp === srcPath);
    file.path[ind] = destPath;
    await file.save();
  }
};

const deleteFolder = async (folderPath: string, userId: string) => {
  const files = await FileModel.find({
    createdBy: userId,
    path: { $regex: `^${folderPath}.*` },
  });

  for (const f of files) {
    f.path = f.path.filter((p) => !p.startsWith(folderPath));
    if (!f.path.length) {
      await f.deleteOne();
    } else {
      await f.save();
    }
  }
};

const copyFolder = async (
  srcPath: string,
  destPath: string,
  userId: string
) => {
  const files = await FileModel.find({
    createdBy: userId,
    path: { $regex: `^${srcPath}.*` },
  });

  for (let f of files) {
    f.path.push(`${destPath}/${f.name}`);
    await f.save();
  }
};

const moveFolder = async (
  srcPath: string,
  destPath: string,
  userId: string
) => {
  const files = await FileModel.find({
    createdBy: userId,
    path: { $regex: `^${srcPath}.*` },
  });

  for (let f of files) {
    for (let i = 0; i < f.path.length; i++) {
      if (f.path[i].startsWith(srcPath)) {
        f.path[i] = `${destPath}/${f.name}`;
      }
    }
    await f.save();
  }
};

export default {
  uploadFile,
  copyFile,
  moveFile,
  deleteFile,
  deleteFolder,
  copyFolder,
  moveFolder,
};
