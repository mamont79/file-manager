import path from "path";
import fs from "fs/promises";
import { checkDirectory } from "../helpers/checkDir.js";

export const addCommand = async (currentPath, fileName) => {
  const newFileName = path.join(currentPath, fileName);
  const check = checkDirectory(newFileName);

  if (check) {
    console.log(`\nFile ${fileName} is already in this dirrectory`);
  } else {
    try {
      await fs.writeFile(newFileName, "", { flag: "wx" });
    } catch {
      console.log("Operation failed");
    }
  }
};
