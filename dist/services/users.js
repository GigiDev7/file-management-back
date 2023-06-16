"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customError_1 = __importDefault(require("../utils/customError"));
const fileSystemProvider_1 = __importDefault(require("./fileSystemProvider"));
const errorEnums_1 = __importDefault(require("../enums/errorEnums"));
const fsProvider = new fileSystemProvider_1.default();
const registerUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(12);
    const hashedPassword = yield bcrypt_1.default.hash(userData.password, salt);
    const newUser = yield User_1.default.create({
        email: userData.email,
        password: hashedPassword,
    });
    yield fsProvider.createDirectory(path_1.default.join(process.cwd(), "public", "uploads", newUser._id.toString()));
});
const loginUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email: userData.email });
    if (!user) {
        throw new customError_1.default("Authentication failed", errorEnums_1.default.AuthenticationError);
    }
    const isPasswordCorrect = yield bcrypt_1.default.compare(userData.password, user.password);
    if (!isPasswordCorrect) {
        throw new customError_1.default("Authentication failed", errorEnums_1.default.AuthenticationError);
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
    return { email: user.email, token };
});
exports.default = { registerUser, loginUser };
