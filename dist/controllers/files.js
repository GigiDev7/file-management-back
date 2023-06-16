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
const fileSystemProvider_1 = __importDefault(require("../services/fileSystemProvider"));
const getPath_1 = require("../utils/getPath");
const files_1 = __importDefault(require("../services/files"));
const fsProvider = new fileSystemProvider_1.default();
const getUserDirs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const queryPath = ((_b = req.query.p) === null || _b === void 0 ? void 0 : _b.toString()) || "";
        const dirPath = (0, getPath_1.getUserFilePath)(userId, queryPath);
        const result = yield fsProvider.listDirectory(dirPath);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
const createFolder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
        const queryPath = ((_d = req.query.p) === null || _d === void 0 ? void 0 : _d.toString()) || "";
        const dirPath = (0, getPath_1.getUserFilePath)(userId, queryPath, req.body.folderName);
        yield fsProvider.createDirectory(dirPath);
        res.status(201).json({ message: "Folder created" });
    }
    catch (error) {
        next(error);
    }
});
const deleteFolder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    try {
        const userId = (_e = req.user) === null || _e === void 0 ? void 0 : _e._id;
        const queryPath = ((_f = req.query.p) === null || _f === void 0 ? void 0 : _f.toString()) || "";
        const dirPath = (0, getPath_1.getUserFilePath)(userId, queryPath, req.body.folderName);
        yield fsProvider.deleteDirectory(dirPath);
        res.status(201).json({ message: "Folder deleted" });
    }
    catch (error) {
        next(error);
    }
});
const moveFolder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    try {
        const userId = (_g = req.user) === null || _g === void 0 ? void 0 : _g._id;
        const srcPath = (0, getPath_1.getUserFilePath)(userId, req.body.sourcePath);
        const destPath = (0, getPath_1.getUserFilePath)(userId, req.body.destinationPath);
        yield fsProvider.moveDirectory(srcPath, destPath);
        res.status(200).json({ message: "Successfully moved folder" });
    }
    catch (error) {
        next(error);
    }
});
const copyFolder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    try {
        const userId = (_h = req.user) === null || _h === void 0 ? void 0 : _h._id;
        const srcPath = (0, getPath_1.getUserFilePath)(userId, req.body.sourcePath);
        const destPath = (0, getPath_1.getUserFilePath)(userId, req.body.destinationPath);
        yield fsProvider.copyDirectory(srcPath, destPath);
        res.status(200).json({ message: "Successfully moved folder" });
    }
    catch (error) {
        next(error);
    }
});
const downloadFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k;
    try {
        const userId = (_j = req.user) === null || _j === void 0 ? void 0 : _j._id;
        const queryPath = ((_k = req.query.p) === null || _k === void 0 ? void 0 : _k.toString()) || "";
        const filePath = (0, getPath_1.getUserFilePath)(userId, queryPath);
        res.download(filePath);
    }
    catch (error) {
        next(error);
    }
});
const deleteFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _l;
    try {
        const userId = (_l = req.user) === null || _l === void 0 ? void 0 : _l._id;
        const filePath = (0, getPath_1.getUserFilePath)(userId, req.body.filePath);
        yield fsProvider.deleteFile(filePath);
        res.status(200).json({ message: "File deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
const copyFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _m;
    try {
        const userId = (_m = req.user) === null || _m === void 0 ? void 0 : _m._id;
        const srcPath = (0, getPath_1.getUserFilePath)(userId, req.body.sourcePath);
        const destPath = (0, getPath_1.getUserFilePath)(userId, req.body.destinationPath);
        yield fsProvider.copyFile(srcPath, destPath);
        res.status(200).json({ message: "File copied successfully" });
    }
    catch (error) {
        next(error);
    }
});
const moveFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _o;
    try {
        const userId = (_o = req.user) === null || _o === void 0 ? void 0 : _o._id;
        const srcPath = (0, getPath_1.getUserFilePath)(userId, req.body.sourcePath);
        const destPath = (0, getPath_1.getUserFilePath)(userId, req.body.destinationPath);
        yield fsProvider.moveFile(srcPath, destPath);
        res.status(200).json({ message: "File copied successfully" });
    }
    catch (error) {
        next(error);
    }
});
const uploadFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _p;
    try {
        const userId = (_p = req.user) === null || _p === void 0 ? void 0 : _p._id;
        yield files_1.default.uploadFile(userId, req.file);
        res.status(200).json({ message: "File uploaded successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.default = {
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
