import fs from "fs/promises";
import path from "path";

export const lsCommand = async (dirPath) => {
  try {
    const files = await fs.readdir(dirPath);
    const filesInfo = [];
    let number = 0;

    for (let i = 0; i < files.length; i++) {
      const filePath = path.join(dirPath, files[i]);
      const currFileInfo = await fs.stat(filePath, { withFileTypes: true });
      let nameOfFile = files[i];
      const typeOfFile = currFileInfo.isDirectory() ? "dirrectory" : "file";

      if (nameOfFile.length < 30) {
        while (nameOfFile.length < 30) {
          nameOfFile = nameOfFile + " ";
        }
      } else if (nameOfFile.length > 30) {
        nameOfFile.substring(0, 30);
      }

      const infoToPush = { name: nameOfFile, type: typeOfFile };
      filesInfo.push(infoToPush);
    }

    filesInfo.sort((a, b) => a.name - b.name);

    for (let j = 0; j < filesInfo.length; j++) {
      if (filesInfo[j].type == "dirrectory") {
        console.log(
          `${number} == ${filesInfo[j].name} == ${filesInfo[j].type}`
        );
        number++;
      }
    }
    for (let j = 0; j < filesInfo.length; j++) {
      if (filesInfo[j].type == "file") {
        console.log(
          `${number} == ${filesInfo[j].name} == ${filesInfo[j].type}`
        );
        number++;
      }
    }
  } catch {
    console.log("Operation failed");
  }
};
