"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const fileSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
});
// Create index for file hashes
//fileSchema.index({hash:1})
const FileModel = mongoose_1.default.model("File", fileSchema);
exports.default = FileModel;
