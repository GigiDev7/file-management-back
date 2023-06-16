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
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
class FileSystemProvider {
    constructor() {
        this.workingDirectory = process.cwd();
    }
    createDirectory(directoryPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield promises_1.default.mkdir(directoryPath, { recursive: true });
                console.log(`Directory created: ${directoryPath}`);
            }
            catch (error) {
                console.log(`Error creating directory: ${directoryPath}`);
                throw error;
            }
        });
    }
    deleteDirectory(directoryPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield promises_1.default.rm(directoryPath, { force: true, recursive: true });
                console.log(`Deleted directory: ${directoryPath}`);
            }
            catch (error) {
                console.log(`Error deleting directory: ${directoryPath}`);
                throw error;
            }
        });
    }
    copyDirectory(sourcePath, destinationPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const files = yield promises_1.default.readdir(sourcePath);
                yield this.createDirectory(destinationPath);
                for (const file of files) {
                    const sourceFilePath = path_1.default.join(sourcePath, file);
                    const destinationFilePath = path_1.default.join(destinationPath, file);
                    const stats = yield promises_1.default.stat(sourceFilePath);
                    if (stats.isDirectory()) {
                        yield this.copyDirectory(sourceFilePath, destinationFilePath);
                    }
                    else {
                        yield promises_1.default.copyFile(sourceFilePath, destinationFilePath);
                        console.log(`Copied file: ${destinationFilePath}`);
                    }
                }
                console.log(`Directory copied: ${destinationPath}`);
            }
            catch (error) {
                console.log(`Error copying directory: ${sourcePath}`);
                throw error;
            }
        });
    }
    moveDirectory(sourcePath, destinationPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield promises_1.default.rename(sourcePath, destinationPath);
                console.log(`Directory moved: ${sourcePath} to ${destinationPath}`);
            }
            catch (error) {
                console.log(`Error moving directory: ${sourcePath}`);
                throw error;
            }
        });
    }
    listDirectory(directoryPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const files = yield promises_1.default.readdir(directoryPath);
                console.log(`Listing files in directory: ${directoryPath}`);
                for (const file of files) {
                    const filePath = path_1.default.join(directoryPath, file);
                    console.log(filePath);
                }
            }
            catch (error) {
                console.log(`Error listing directory: ${directoryPath}`);
                throw error;
            }
        });
    }
    writeFile(filePath, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield promises_1.default.writeFile(filePath, data);
                console.log(`File written: ${filePath}`);
            }
            catch (error) {
                console.log(`Error writing file: ${filePath}`);
                throw error;
            }
        });
    }
    readFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield promises_1.default.readFile(filePath, "utf8");
                console.log(`File read: ${filePath}`);
                return data;
            }
            catch (error) {
                console.log(`Error reading file: ${filePath}`);
                throw error;
            }
        });
    }
    moveFile(sourcePath, destinationPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield promises_1.default.rename(sourcePath, destinationPath);
                console.log(`File moved: ${sourcePath} to ${destinationPath}`);
            }
            catch (error) {
                console.log(`Error moving file: ${sourcePath}`);
                throw error;
            }
        });
    }
    deleteFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield promises_1.default.unlink(filePath);
                console.log(`Deleted file: ${filePath}`);
            }
            catch (error) {
                console.log(`Error deleting file: ${filePath}`);
                throw error;
            }
        });
    }
    copyFile(sourcePath, destinationPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield promises_1.default.copyFile(sourcePath, destinationPath);
                console.log(`File copied: ${sourcePath} to ${destinationPath}`);
            }
            catch (error) {
                console.log(`Error copying file: ${sourcePath}`);
                throw error;
            }
        });
    }
    getInfo(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stats = yield promises_1.default.stat(filePath);
                const isDirectory = stats.isDirectory();
                const size = stats.size;
                const createdAt = stats.birthtime;
                const modifiedAt = stats.mtime;
                console.log(`Information for: ${filePath}`);
                console.log(`Is Directory: ${isDirectory}`);
                console.log(`Size: ${size} bytes`);
                console.log(`Created At: ${createdAt}`);
                console.log(`Modified At: ${modifiedAt}`);
            }
            catch (error) {
                console.log(`Error getting information for: ${filePath}`);
                throw error;
            }
        });
    }
    getWorkingDirectory() {
        return this.workingDirectory;
    }
    setWorkingDirectory(directoryPath) {
        if (!path_1.default.isAbsolute(directoryPath)) {
            directoryPath = path_1.default.join(this.workingDirectory, directoryPath);
        }
        this.workingDirectory = directoryPath;
        console.log(`Working directory set to: ${directoryPath}`);
    }
}
exports.default = FileSystemProvider;
const fileSystem = new FileSystemProvider();
function runExample() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create directory
            //await fileSystem.createDirectory("./example");
            //await fileSystem.deleteDirectory("./example2");
            //await fileSystem.moveDirectory("./example", "./test/example");
            //await fileSystem.listDirectory("./");
            //await fileSystem.writeFile("./test/example.txt", "hello");
            //await fileSystem.copyFile("./test/example.txt", "./test/copy");
            //await fileSystem.deleteFile("./test/copy");
            //await fileSystem.getInfo("./test/example/test.txt");
            fileSystem.setWorkingDirectory("../models");
            console.log(fileSystem.getWorkingDirectory());
        }
        catch (error) {
            console.error(error);
        }
    });
}
runExample();
