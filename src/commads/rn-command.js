import path from "path";
import fs from "fs/promises";
import { checkDirectory } from "../helpers/checkDir.js";

export const rnCommand = async (currentPath, fileName, renamedFileName) => {
  let fileToRename = fileName;
  let newFileName = renamedFileName;

  if (!path.isAbsolute(fileToRename)) {
    fileToRename = path.join(currentPath, fileToRename);
  }
  if (!path.isAbsolute(newFileName)) {
    newFileName = path.join(currentPath, newFileName);
  }

  const check = checkDirectory(fileToRename);

  if (!check) {
    console.log(`\nFile ${fileName} is is not exist`);
  } else {
    try {
      await fs.rename(fileToRename, newFileName);
    } catch {
      console.log("Operation failed");
    }
  }
};
