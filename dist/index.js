"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const serve_index_1 = __importDefault(require("serve-index"));
require("./connectDB");
const users_1 = __importDefault(require("./routes/users"));
const files_1 = __importDefault(require("./routes/files"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const app = (0, express_1.default)();
//app middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/ftp", express_1.default.static("public"), (0, serve_index_1.default)("public", {
    icons: true,
}));
//api routes
app.use("/auth", users_1.default);
app.use("/file", files_1.default);
//error handler middleware
app.use(errorHandler_1.default);
app.listen(8000, () => {
    console.log("listening on port 8000");
});
