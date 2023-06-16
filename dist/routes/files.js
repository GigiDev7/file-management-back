"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../multer"));
const protectRoute_1 = __importDefault(require("../middleware/protectRoute"));
const files_1 = __importDefault(require("../controllers/files"));
const router = express_1.default.Router();
router.use(protectRoute_1.default);
router.post("/upload", multer_1.default.single("file"), files_1.default.uploadFile);
router.get("/download", files_1.default.downloadFile);
router.post("/delete", files_1.default.deleteFile);
router.post("/copy", files_1.default.copyFile);
router.post("/move", files_1.default.moveFile);
router
    .route("/dirs")
    .get(files_1.default.getUserDirs)
    .post(files_1.default.createFolder);
router.post("/dirs/remove", files_1.default.deleteFolder);
router.post("/dirs/move", files_1.default.moveFolder);
router.post("/dirs/copy", files_1.default.copyFolder);
exports.default = router;
