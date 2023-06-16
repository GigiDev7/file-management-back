import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    path: {
      type: [String],
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
    },
    content: {
      type: Buffer,
    },
    hash: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for file hashes
//fileSchema.index({hash:1})

const FileModel = mongoose.model("File", fileSchema);

export default FileModel;
