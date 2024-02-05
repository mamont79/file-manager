import path from "path";
import fs from "fs";
import { createHash } from "crypto";

export const hashCommand = async (currentPath, fileName) => {
  let fileForHashCalc = fileName;

  if (!path.isAbsolute(fileForHashCalc)) {
    fileForHashCalc = path.join(currentPath, fileName);
  }

  const hashOfFile = createHash("sha256");
  const fileHashStream = fs.createReadStream(fileForHashCalc);

  fileHashStream
    .on("data", (data) => {
      hashOfFile.update(data);
    })
    .on("end", () => {
      const calculatedHash = hashOfFile.digest("hex");
      console.log(`hash of file is:   ${calculatedHash}`);
    });
};
