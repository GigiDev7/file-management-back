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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
function default_1(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.headers.authorization || !req.headers.authorization.split(" ")[1]) {
            return res.status(401).json({ message: "Authentication Failed" });
        }
        const token = req.headers.authorization.split(" ")[1];
        try {
            const decodedData = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const userId = decodedData.id;
            const user = yield User_1.default.findById(userId);
            if (!user) {
                return res.status(401).json({ message: "Authentication Failed" });
            }
            req.user = { _id: user._id.toString(), email: user.email };
            next();
        }
        catch (error) {
            return res.status(401).json({ message: "Authentication Failed" });
        }
    });
}
exports.default = default_1;
