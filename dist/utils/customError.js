"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(message, name) {
        super(message);
        this.message = message;
        this.name = name;
        this.name = name;
    }
}
exports.default = CustomError;
