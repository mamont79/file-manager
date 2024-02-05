import os from "os";

export const osCommand = async (flag) => {
  const flags = [
    "--EOL",
    "--cpus",
    "--homedir",
    "--username",
    "--architecture",
  ];
  if (flags.indexOf(flag) < 0) {
    console.log("No such flag. Try one of them");
    console.log(flags);
  } else if (flag == "--EOL") {
    const eolInfo = JSON.stringify(os.EOL);
    console.log(`\nDefault sistem EOL is:  ${eolInfo}`);
  } else if (flag == "--cpus") {
    const cpusInfo = os.cpus();
    console.log(`\nTotal amount of CPU cores is: ${cpusInfo.length}`);
    for (let i = 0; i < cpusInfo.length; i++) {
      console.log(
        `\n${i + 1}  model:  ${cpusInfo[i].model}\n   speed:  ${(
          cpusInfo[i].speed / 1000
        ).toFixed(1)} GGz`
      );
    }
  } else if (flag == "--homedir") {
    const homeDir = os.homedir();
    console.log(`\nHome dirrectory is:  ${homeDir}`);
  } else if (flag == "--username") {
    const userInfo = os.userInfo();
    const userName = userInfo.username;
    console.log(`\nUsername is:  ${userName}`);
  } else if (flag == "--architecture") {
    const archInfo = os.arch();
    console.log(`\nCPU architecture is:  ${archInfo}`);
  }
};
