"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const fileSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    hash: {
        type: String,
    },
}, {
    timestamps: true,
});
fileSchema.index({ hash: 1 });
const FileModel = mongoose_1.default.model("File", fileSchema);
exports.default = FileModel;
