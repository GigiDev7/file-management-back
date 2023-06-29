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
const getFiles = (userId, path) => {
    return File_1.default.find({
        createdBy: userId,
        path,
    });
};
const uploadFile = (userId, file, filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const fileContent = yield fsProvider.readFile(file.path);
    const fileHash = crypto_1.default.createHash("md5").update(fileContent).digest("hex");
    const existingFile = yield File_1.default.findOne({ hash: fileHash });
    let fsPath = file.path;
    if (existingFile) {
        fsPath = existingFile.fsPath;
        yield fsProvider.deleteFile(file.path);
    }
    const newFile = yield File_1.default.create({
        createdBy: userId,
        mimeType: file.mimetype,
        name: file.filename,
        path: filePath,
        size: file.size,
        hash: fileHash,
        fsPath,
    });
    return newFile;
});
const deleteFile = (fileId) => __awaiter(void 0, void 0, void 0, function* () {
    const file = yield File_1.default.findById(fileId);
    const fileHash = file === null || file === void 0 ? void 0 : file.hash;
    const fsPath = file === null || file === void 0 ? void 0 : file.fsPath;
    yield (file === null || file === void 0 ? void 0 : file.deleteOne());
    const referenceFile = yield File_1.default.findOne({ hash: fileHash });
    if (!referenceFile) {
        yield fsProvider.deleteFile(fsPath);
    }
    //return FileModel.findByIdAndDelete(fileId);
});
const moveFile = (fileId, newPath) => {
    return File_1.default.findByIdAndUpdate(fileId, { path: newPath });
};
const copyFile = (fileId, newPath) => __awaiter(void 0, void 0, void 0, function* () {
    const file = yield File_1.default.findById(fileId);
    if (file) {
        yield File_1.default.create({
            createdBy: file.createdBy,
            mimeType: file.mimeType,
            name: file.name,
            path: newPath,
            size: file.size,
            hash: file.hash,
            fsPath: file.fsPath,
        });
    }
});
const downloadFile = (fileId) => __awaiter(void 0, void 0, void 0, function* () {
    const file = yield File_1.default.findById(fileId);
    if (file) {
        return file.fsPath;
    }
});
const createFolder = (userId, path, folderName) => {
    return File_1.default.create({
        createdBy: userId,
        name: folderName,
        path,
    });
};
const deleteFolder = (folderId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const folder = yield File_1.default.findById(folderId);
    yield File_1.default.deleteMany({
        createdBy: userId,
        path: {
            $regex: `^${((_a = folder === null || folder === void 0 ? void 0 : folder.path) === null || _a === void 0 ? void 0 : _a.length) === 1 ? "/" : (folder === null || folder === void 0 ? void 0 : folder.path) + "/"}${folder === null || folder === void 0 ? void 0 : folder.name}`,
        },
    });
    yield (folder === null || folder === void 0 ? void 0 : folder.deleteOne());
});
const moveFolder = (folderId, userId, newPath) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    const folder = yield File_1.default.findById(folderId);
    if (folder) {
        const files = yield File_1.default.find({
            createdBy: userId,
            path: {
                $regex: `^${folder === null || folder === void 0 ? void 0 : folder.path}${((_b = folder.path) === null || _b === void 0 ? void 0 : _b.length) === 1 ? folder.name : "/" + folder.name}`,
            },
        });
        for (const f of files) {
            if (newPath.length === 1) {
                f.path = newPath + ((_c = f.path) === null || _c === void 0 ? void 0 : _c.slice(folder.path.length + 1));
            }
            else {
                f.path = newPath + "/" + ((_d = f.path) === null || _d === void 0 ? void 0 : _d.slice(folder.path.length));
            }
            yield f.save();
        }
        folder.path = newPath;
        yield (folder === null || folder === void 0 ? void 0 : folder.save());
    }
});
const copyFolder = (folderId, userId, newPath) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g;
    const folder = yield File_1.default.findById(folderId);
    if (folder) {
        const files = yield File_1.default.find({
            createdBy: userId,
            path: {
                $regex: `^${folder === null || folder === void 0 ? void 0 : folder.path}${((_e = folder.path) === null || _e === void 0 ? void 0 : _e.length) === 1 ? folder.name : "/" + folder.name}`,
            },
        });
        for (const f of files) {
            const newfileData = {
                createdBy: f.createdBy,
                name: f.name,
                path: newPath.length === 1
                    ? newPath + ((_f = f.path) === null || _f === void 0 ? void 0 : _f.slice(folder.path.length + 1))
                    : (f.path = newPath + "/" + ((_g = f.path) === null || _g === void 0 ? void 0 : _g.slice(folder.path.length))),
            };
            if (f.mimeType)
                newfileData.mimeType = f.mimeType;
            if (f.size)
                newfileData.size = f.size;
            if (f.hash)
                newfileData.hash = f.hash;
            if (f.fsPath)
                newfileData.fsPath = f.fsPath;
            yield File_1.default.create(newfileData);
        }
        yield File_1.default.create({
            createdBy: folder.createdBy,
            name: folder.name,
            path: newPath,
        });
    }
});
exports.default = {
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
