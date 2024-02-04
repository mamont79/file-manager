import path from "path";
import fs from "fs";

const checkDirectory = (path) => {
  return fs.existsSync(path);
};

export const cdCommand = (currPath, newPath) => {
  let newDir = newPath;
  if (!path.isAbsolute(newPath)) {
    newDir = path.join(currPath, newPath);
  }
  let check = checkDirectory(newDir);

  if (!check) {
    console.log(`No such directory ${newDir}`);
    newDir = currPath;
  }
  return newDir;
};
