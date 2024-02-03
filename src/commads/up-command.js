import path from "path";

export const upCommand = (currentPath) => {
  const newPath = path.join(currentPath, "..");
  return newPath;
};
