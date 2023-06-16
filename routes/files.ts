import express from "express";
import upload from "../multer";
import protectRoute from "../middleware/protectRoute";
import userFilesController from "../controllers/files";

const router = express.Router();

router.use(protectRoute);

router.post("/upload", upload.single("file"), userFilesController.uploadFile);
router.get("/download", userFilesController.downloadFile);
router.post("/delete", userFilesController.deleteFile);
router.post("/copy", userFilesController.copyFile);
router.post("/move", userFilesController.moveFile);

router
  .route("/dirs")
  .get(userFilesController.getUserDirs)
  .post(userFilesController.createFolder);
router.post("/dirs/remove", userFilesController.deleteFolder);
router.post("/dirs/move", userFilesController.moveFolder);
router.post("/dirs/copy", userFilesController.copyFolder);

export default router;
