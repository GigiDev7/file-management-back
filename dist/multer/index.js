"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const getPath_1 = require("../utils/getPath");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        var _a, _b;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const queryPath = ((_b = req.query.p) === null || _b === void 0 ? void 0 : _b.toString()) || "";
        cb(null, (0, getPath_1.getUserFilePath)(userId, queryPath));
    },
    filename(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
