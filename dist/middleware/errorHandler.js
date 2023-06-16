"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorEnums_1 = __importDefault(require("../enums/errorEnums"));
function errorHandler(err, req, res, next) {
    if (err.code && err.code === 11000) {
        return res
            .status(409)
            .json({ message: err.message || "Email already registered" });
    }
    else if (err.name === errorEnums_1.default.AuthenticationError) {
        return res
            .status(401)
            .json({ message: err.message || "Authentication failed" });
    }
    else {
        return res
            .status(500)
            .json({ message: err.message || "Something went wrong" });
    }
}
exports.default = errorHandler;
