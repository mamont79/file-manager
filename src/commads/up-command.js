import path from "path";

export const upCommand = (currentPath) => {
  const newPath = path.join(currentPath, "..");
  process.chdir(newPath);
  return newPath;
};
