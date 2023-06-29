import express from "express";
import upload from "../multer";
import protectRoute from "../middleware/protectRoute";
import userFilesController from "../controllers/files";

const router = express.Router();

router.use(protectRoute);

router
  .route("/")
  .get(userFilesController.getUserFiles)
  .post(upload.single("file"), userFilesController.uploadFile);

router
  .route("/:fileId")
  .get(userFilesController.downloadFile)
  .delete(userFilesController.deleteFile);

router.route("/dir").post(userFilesController.createFolder);

router.route("/dir/:folderId").delete(userFilesController.deleteFolder);

router.post("/copy/:fileId", userFilesController.copyFile);
router.post("/move/:fileId", userFilesController.moveFile);
router.post("/dir/copy/:folderId", userFilesController.copyFolder);
router.post("/dir/move/:folderId", userFilesController.moveFolder);

export default router;
