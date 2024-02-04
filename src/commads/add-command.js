import path from "path";

export const addFile = async (currentPath, fileName) => {
  const newFileName = path.join(currentPath, fileName);
  try {
    await fs.writeFile(newFileName, "", { flag: "wx" });
    console.log(`File ${fileName} was created`);
  } catch {
    console.log("Operation failed");
  }
};
