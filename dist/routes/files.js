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
router
    .route("/")
    .get(files_1.default.getUserFiles)
    .post(multer_1.default.single("file"), files_1.default.uploadFile);
router
    .route("/:fileId")
    .get(files_1.default.downloadFile)
    .delete(files_1.default.deleteFile);
router.route("/dir").post(files_1.default.createFolder);
router.route("/dir/:folderId").delete(files_1.default.deleteFolder);
router.post("/copy/:fileId", files_1.default.copyFile);
router.post("/move/:fileId", files_1.default.moveFile);
router.post("/dir/copy/:folderId", files_1.default.copyFolder);
router.post("/dir/move/:folderId", files_1.default.moveFolder);
exports.default = router;
