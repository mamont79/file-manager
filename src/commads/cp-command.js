import path from "path";
import fs from "fs";
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
  const checkCopy = checkDirectory(newFileName);

  if (!check) {
    console.log(`\nFile ${fileName} is is not exist`);
  } else if (checkCopy) {
    console.log(`\nFile ${renamedFileName} is already exist`);
  } else {
    try {
      const readStream = fs.createReadStream(fileToCopy);
      const writeStream = fs.createWriteStream(newFileName);
      readStream.pipe(writeStream);
    } catch {
      console.log("Operation failed");
    }
  }
};
