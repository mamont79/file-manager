import fs from "fs";

export const checkDirectory = (path) => {
  return fs.existsSync(path);
};
