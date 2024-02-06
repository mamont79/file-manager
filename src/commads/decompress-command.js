import fs from "fs";
import path from "path";
import zlib from "zlib";
import { checkDirectory } from "../helpers/checkDir.js";

export const decompressCommand = async (
  currentPath,
  gzFileName,
  outputFile
) => {
  let fileToDecompress = gzFileName;
  let decompressedFile = outputFile;

  if (!path.isAbsolute(fileToDecompress)) {
    fileToDecompress = path.join(currentPath, fileToDecompress);
  }
  if (!path.isAbsolute(decompressedFile)) {
    decompressedFile = path.join(currentPath, decompressedFile);
  }

  const checkInput = checkDirectory(fileToDecompress);
  const checkOutput = checkDirectory(decompressedFile);

  if (!checkInput) {
    console.log(`\nFile ${fileToDecompress} is is not exist`);
  } else if (checkOutput) {
    console.log(`\nDecompressed file ${decompressedFile} is already exist`);
  } else {
    try {
      const inputFIleStream = fs.createReadStream(fileToDecompress);
      const outputFIleStream = fs.createWriteStream(decompressedFile);
      const brotliStream = zlib.createBrotliDecompress();

      inputFIleStream.pipe(brotliStream).pipe(outputFIleStream);
    } catch {
      console.log("Operation failed");
    }
  }
};
