import path from "path";
import fs from "fs";
import { checkDirectory } from "../helpers/checkDir.js";

export const mvCommand = async (currentPath, fileName, newDir) => {
  let fileToMove = fileName;
  let newDirName = newDir;
  let fileNameToCopy = fileName;

  if (!path.isAbsolute(fileName)) {
    fileToMove = path.join(currentPath, fileToMove);
  } else {
    fileNameToCopy = path.parse(fileName).base;
    console.log(fileNameToCopy);
  }
  if (!path.isAbsolute(newDirName)) {
    newDirName = path.join(currentPath, newDirName);
  }

  const check = checkDirectory(fileToMove);
  const checkNewDir = checkDirectory(newDirName);

  if (!check) {
    console.log(`\nFile ${fileName} is is not exist`);
  } else if (!checkNewDir) {
    console.log(`\nDirrectory ${newDirName} is not exist`);
  } else {
    try {
      const copyFile = path.join(newDirName, fileNameToCopy);
      const checkCopy = checkDirectory(copyFile);
      if (checkCopy) {
        console.log(
          `File ${copyFile} is already exist. Try another dirrectory`
        );
      } else {
        const readStream = fs.createReadStream(fileToMove);
        const writeStream = fs.createWriteStream(copyFile);
        readStream.pipe(writeStream);
      }
    } catch {
      console.log("Operation failed");
    }
  }
};
