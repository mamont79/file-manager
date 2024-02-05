import path from "path";
import fs from "fs";
import { createHash } from "crypto";
import { checkDirectory } from "../helpers/checkDir.js";

export const hashCommand = async (currentPath, fileName) => {
  let fileForHashCalc = fileName;

  if (!path.isAbsolute(fileForHashCalc)) {
    fileForHashCalc = path.join(currentPath, fileName);
  }

  const check = checkDirectory(fileForHashCalc);

  if (!check) {
    console.log(`Can't find ${fileForHashCalc}. Try again`);
  } else {
    try {
      const hashOfFile = createHash("sha256");
      const fileHashStream = fs.createReadStream(fileForHashCalc);

      fileHashStream
        .on("data", (data) => {
          hashOfFile.update(data);
        })
        .on("close", () => {
          fileHashStream.close();
        })
        .on("end", () => {
          const calculatedHash = hashOfFile.digest("hex");
          console.log(`Besides, hash of file is:   ${calculatedHash}`);
        });
    } catch {
      console.log("Operation failed");
    }
  }
};
