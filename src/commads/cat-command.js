import path from "path";
import fs from "fs";
import { checkDirectory } from "../helpers/checkDir.js";

export const catCommand = async (dirPath, filePath) => {
  let fileToRead = filePath;

  if (!path.isAbsolute(fileToRead)) {
    fileToRead = path.join(dirPath, filePath);
  }

  const check = checkDirectory(fileToRead);

  if (check) {
    const readStream = fs.createReadStream(fileToRead, "utf8");
    readStream
      .on("data", (chunk) => {
        console.log(chunk);
      })
      .on("end", (err) => {
        readStream.destroy();
      })
      .on("close", (err) => {
        console.log("\nAll the data in the file has been read \n");
        console.log(`\nYou are currently in  ==>  ${dirPath}`);
        console.log(`I wait for your command: \n`);
      });
  } else {
    console.log("No such file has been found. Try again");
  }
};
