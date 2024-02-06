import path from "path";
import { checkDirectory } from "../helpers/checkDir.js";

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
