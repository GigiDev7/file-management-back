import multer from "multer";
import path from "path";
import { getUserFilePath } from "../utils/getPath";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.user?._id as string;
    const queryPath = req.query.p?.toString() || "";
    cb(null, getUserFilePath(userId, queryPath));
  },
  filename(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

export default upload;
