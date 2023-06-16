"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileSystemProvider_1 = __importDefault(require("./fileSystemProvider"));
const File_1 = __importDefault(require("../models/File"));
const crypto_1 = __importDefault(require("crypto"));
const fsProvider = new fileSystemProvider_1.default();
const uploadFile = (userId, file) => __awaiter(void 0, void 0, void 0, function* () {
    const fileContent = yield fsProvider.readFile(file.path);
    const fileHash = crypto_1.default.createHash("md5").update(fileContent).digest("hex");
    // Don't upload file if the file with same content already exists, just add new path in DB
    /* const existingFile = await FileModel.findOne({ hash: fileHash });
     if (existingFile) {
      await fsProvider.deleteFile(file.path);
      existingFile.path.push(file.path)
      await existingFile.save()
      return;
    }  */
    const newFile = yield File_1.default.create({
        content: fileContent,
        createdBy: userId,
        mimeType: file.mimetype,
        name: file.filename,
        path: [file.path],
        size: file.size,
        hash: fileHash,
    });
    return newFile;
});
const deleteFile = (filePath, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const file = yield File_1.default.findOne({
        createdBy: userId,
        path: { $all: [filePath] },
    });
    if (file) {
        file.path = file.path.filter((fp) => fp !== filePath);
        if (file.path.length) {
            yield file.save();
        }
        else {
            yield file.deleteOne();
        }
    }
});
const copyFile = (srcPath, desPath, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const file = yield File_1.default.findOne({
        createdBy: userId,
        path: { $all: [srcPath] },
    });
    if (file) {
        file.path.push(desPath);
        yield file.save();
    }
});
const moveFile = (srcPath, destPath, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const file = yield File_1.default.findOne({
        createdBy: userId,
        path: { $all: [srcPath] },
    });
    if (file) {
        const ind = file.path.findIndex((fp) => fp === srcPath);
        file.path[ind] = destPath;
        yield file.save();
    }
});
exports.default = {
    uploadFile,
    copyFile,
    moveFile,
    deleteFile,
};
