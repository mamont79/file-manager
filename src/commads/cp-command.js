import path from "path";
import fs from "fs/promises";
import { checkDirectory } from "../helpers/checkDir.js";

export const cpCommand = async (currentPath, fileName, renamedFileName) => {
  let fileToCopy = fileName;
  let newFileName = renamedFileName;

  if (!path.isAbsolute(fileToCopy)) {
    fileToCopy = path.join(currentPath, fileToCopy);
  }
  if (!path.isAbsolute(newFileName)) {
    newFileName = path.join(currentPath, newFileName);
  }

  const check = checkDirectory(fileToCopy);

  if (!check) {
    console.log(`\nFile ${fileName} is is not exist`);
  } else {
    try {
      await fs
        .createReadStream(fileToCopy)
        .pipe(fs.createWriteStream(newFileName));
    } catch {
      console.log("Operation failed");
    }
  }
};
