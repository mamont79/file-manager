import path from "path";
import fs from "fs/promises";
import { checkDirectory } from "../helpers/checkDir.js";

export const rmCommand = async (currentPath, fileName) => {
  let fileToDelete = fileName;

  if (!path.isAbsolute(fileToDelete)) {
    fileToDelete = path.join(currentPath, fileName);
  }

  const check = checkDirectory(fileToDelete);

  if (!check) {
    console.log(`\nFile ${fileName} is not exist`);
  } else {
    try {
      await fs.unlink(fileToDelete);
    } catch {
      console.log("Operation failed");
    }
  }
};
