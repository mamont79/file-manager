import fs from "fs";
import path from "path";
import zlib from "zlib";
import { checkDirectory } from "../helpers/checkDir.js";

export const compressCommand = async (currentPath, fileName, gzFileName) => {
  let fileToCompress = fileName;
  let compressedFile = gzFileName;

  if (!path.isAbsolute(fileToCompress)) {
    fileToCompress = path.join(currentPath, fileToCompress);
  }
  if (!path.isAbsolute(compressedFile)) {
    compressedFile = path.join(currentPath, compressedFile);
  }

  const checkInput = checkDirectory(fileToCompress);
  const checkOutput = checkDirectory(compressedFile);

  if (!checkInput) {
    console.log(`\nFile ${fileToCompress} is is not exist`);
  } else if (checkOutput) {
    console.log(`\nCompressed file ${compressedFile} is already exist`);
  } else {
    try {
      const inputFIleStream = fs.createReadStream(fileToCompress);
      const outputFIleStream = fs.createWriteStream(compressedFile);
      const brotliStream = zlib.createBrotliCompress();

      inputFIleStream.pipe(brotliStream).pipe(outputFIleStream);
    } catch {
      console.log("Operation failed");
    }
  }
};
