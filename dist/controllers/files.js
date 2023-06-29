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
const files_1 = __importDefault(require("../services/files"));
const mongoose_1 = __importDefault(require("mongoose"));
const getUserFiles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = new mongoose_1.default.Types.ObjectId((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
        const queryPath = ((_b = req.query.p) === null || _b === void 0 ? void 0 : _b.toString()) || "/";
        const result = yield files_1.default.getFiles(userId, queryPath);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
const uploadFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const userId = new mongoose_1.default.Types.ObjectId((_c = req.user) === null || _c === void 0 ? void 0 : _c._id);
        yield files_1.default.uploadFile(userId, req.file, req.body.filePath);
        res.status(200).json({ message: "File uploaded successfully" });
    }
    catch (error) {
        next(error);
    }
});
const downloadFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileId = new mongoose_1.default.Types.ObjectId(req.params.fileId);
        const filePath = yield files_1.default.downloadFile(fileId);
        res.download(filePath);
    }
    catch (error) {
        next(error);
    }
});
const deleteFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileId = new mongoose_1.default.Types.ObjectId(req.params.fileId);
        yield files_1.default.deleteFile(fileId);
        res.status(200).json({ message: "File deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
const copyFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileId = new mongoose_1.default.Types.ObjectId(req.params.fileId);
        const newPath = req.body.path;
        yield files_1.default.copyFile(fileId, newPath);
        res.status(200).json({ message: "File copied successfully" });
    }
    catch (error) {
        next(error);
    }
});
const moveFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileId = new mongoose_1.default.Types.ObjectId(req.params.fileId);
        const newPath = req.body.path;
        yield files_1.default.moveFile(fileId, newPath);
        res.status(200).json({ message: "File copied successfully" });
    }
    catch (error) {
        next(error);
    }
});
const createFolder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const userId = new mongoose_1.default.Types.ObjectId((_d = req.user) === null || _d === void 0 ? void 0 : _d._id);
        const path = req.body.path;
        const folderName = req.body.folderName;
        yield files_1.default.createFolder(userId, path, folderName);
        res.status(201).json({ message: "Folder created" });
    }
    catch (error) {
        next(error);
    }
});
const deleteFolder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const userId = new mongoose_1.default.Types.ObjectId((_e = req.user) === null || _e === void 0 ? void 0 : _e._id);
        const folderId = new mongoose_1.default.Types.ObjectId(req.params.folderId);
        yield files_1.default.deleteFolder(folderId, userId);
        res.status(201).json({ message: "Folder deleted" });
    }
    catch (error) {
        next(error);
    }
});
const moveFolder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        const userId = new mongoose_1.default.Types.ObjectId((_f = req.user) === null || _f === void 0 ? void 0 : _f._id);
        const folderId = new mongoose_1.default.Types.ObjectId(req.params.folderId);
        const newPath = req.body.path;
        yield files_1.default.moveFolder(folderId, userId, newPath);
        res.status(200).json({ message: "Successfully moved folder" });
    }
    catch (error) {
        next(error);
    }
});
const copyFolder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    try {
        const userId = new mongoose_1.default.Types.ObjectId((_g = req.user) === null || _g === void 0 ? void 0 : _g._id);
        const folderId = new mongoose_1.default.Types.ObjectId(req.params.folderId);
        const newPath = req.body.path;
        yield files_1.default.copyFolder(folderId, userId, newPath);
        res.status(200).json({ message: "Successfully moved folder" });
    }
    catch (error) {
        next(error);
    }
});
exports.default = {
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
