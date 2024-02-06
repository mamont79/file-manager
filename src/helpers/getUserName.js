export const getUserName = () => {
  const args = process.argv;
  let userName = "Anonymous";

  for (let i = 0; i < args.length; i++) {
    if (args[i].includes("username=")) {
      userName = args[i].split("=")[1];
    }
  }
  return userName;
};
