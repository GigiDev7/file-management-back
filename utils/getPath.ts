import path from "path";

export function getUserFilePath(userId: string, ...paths: string[]): string {
  return path.join(process.cwd(), "public", "uploads", userId, ...paths);
}
