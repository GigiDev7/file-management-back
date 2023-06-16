import fs from "fs/promises";
import path from "path";
import fse from "fs-extra";

export default class FileSystemProvider {
  workingDirectory = process.cwd();

  async createDirectory(directoryPath: string) {
    try {
      await fs.mkdir(directoryPath, { recursive: true });
      console.log(`Directory created: ${directoryPath}`);
    } catch (error) {
      console.log(`Error creating directory: ${directoryPath}`);
      throw error;
    }
  }

  async deleteDirectory(directoryPath: string) {
    try {
      await fs.rm(directoryPath, { force: true, recursive: true });
      console.log(`Deleted directory: ${directoryPath}`);
    } catch (error) {
      console.log(`Error deleting directory: ${directoryPath}`);
      throw error;
    }
  }

  async copyDirectory(sourcePath: string, destinationPath: string) {
    try {
      /* const files = await fs.readdir(sourcePath);
      await this.createDirectory(destinationPath);
      for (const file of files) {
        const sourceFilePath = path.join(sourcePath, file);
        const destinationFilePath = path.join(destinationPath, file);

        const stats = await fs.stat(sourceFilePath);
        if (stats.isDirectory()) {
          await this.copyDirectory(sourceFilePath, destinationFilePath);
        } else {
          await fs.copyFile(sourceFilePath, destinationFilePath);
          console.log(`Copied file: ${destinationFilePath}`);
        }
      } */
      await fse.copy(sourcePath, destinationPath);
      console.log(`Directory copied: ${destinationPath}`);
    } catch (error) {
      console.log(`Error copying directory: ${sourcePath}`);
      throw error;
    }
  }

  async moveDirectory(sourcePath: string, destinationPath: string) {
    try {
      await fse.move(sourcePath, destinationPath);
      console.log(`Directory moved: ${sourcePath} to ${destinationPath}`);
    } catch (error) {
      console.log(`Error moving directory: ${sourcePath}`);
      throw error;
    }
  }

  async listDirectory(directoryPath: string) {
    try {
      const result = [];
      const files = await fs.readdir(directoryPath);
      for (const file of files) {
        const filePath = path.join(directoryPath, file);
        const stat = await fs.stat(filePath);
        result.push({
          path: filePath,
          dir: stat.isDirectory(),
          file: stat.isFile(),
        });
      }
      return result;
    } catch (error) {
      console.log(`Error listing directory: ${directoryPath}`);
      throw error;
    }
  }

  async writeFile(filePath: string, data: string | Buffer) {
    try {
      await fs.writeFile(filePath, data);
      console.log(`File written: ${filePath}`);
    } catch (error) {
      console.log(`Error writing file: ${filePath}`);
      throw error;
    }
  }

  async readFile(filePath: string) {
    try {
      const data = await fs.readFile(filePath, "utf8");
      console.log(`File read: ${filePath}`);
      return data;
    } catch (error) {
      console.log(`Error reading file: ${filePath}`);
      throw error;
    }
  }

  async moveFile(sourcePath: string, destinationPath: string) {
    try {
      await fse.move(sourcePath, destinationPath);
      console.log(`File moved: ${sourcePath} to ${destinationPath}`);
    } catch (error) {
      console.log(`Error moving file: ${sourcePath}`);
      throw error;
    }
  }

  async deleteFile(filePath: string) {
    try {
      await fs.unlink(filePath);
      console.log(`Deleted file: ${filePath}`);
    } catch (error) {
      console.log(`Error deleting file: ${filePath}`);
      throw error;
    }
  }

  async copyFile(sourcePath: string, destinationPath: string) {
    try {
      await fs.copyFile(sourcePath, destinationPath);
      console.log(`File copied: ${sourcePath} to ${destinationPath}`);
    } catch (error) {
      console.log(`Error copying file: ${sourcePath}`);
      throw error;
    }
  }

  async getInfo(filePath: string) {
    try {
      const stats = await fs.stat(filePath);
      const isDirectory = stats.isDirectory();
      const isFile = stats.isFile();
      const size = stats.size;
      const createdAt = stats.birthtime;
      const modifiedAt = stats.mtime;

      return { isDirectory, isFile, size, createdAt, modifiedAt };
    } catch (error) {
      console.log(`Error getting information for: ${filePath}`);
      throw error;
    }
  }

  getWorkingDirectory() {
    return this.workingDirectory;
  }

  setWorkingDirectory(directoryPath: string) {
    if (!path.isAbsolute(directoryPath)) {
      directoryPath = path.join(this.workingDirectory, directoryPath);
    }

    this.workingDirectory = directoryPath;
    console.log(`Working directory set to: ${directoryPath}`);
  }
}

/* const f = new FileSystemProvider();

async function runExample() {
  try {
    const res = await f.listDirectory("./public/uploads");
    console.log(res);
  } catch (error) {
    console.error(error);
  }
}

runExample();
 */
