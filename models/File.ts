import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    path: {
      type: String,
    },
    fsPath: {
      type: String,
    },
    size: {
      type: Number,
    },
    mimeType: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    hash: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

fileSchema.index({ hash: 1 });

const FileModel = mongoose.model("File", fileSchema);

export default FileModel;
