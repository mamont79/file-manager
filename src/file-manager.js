import path from "path";
import process from "process";
import { fileURLToPath } from "url";
import os from "node:os";
import readline from "node:readline";

import { getUserName } from "./helpers/getUserName.js";
import { commandsList } from "./helpers/commandsList.js";
import { upCommand } from "./commads/up-command.js";
import { cdCommand } from "./commads/cd-command.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const commandsDir = path.join(__dirname, "commands");
const workigDir = process.cwd();
const homeDir = os.homedir();
const userName = getUserName();

let currentWorkingDir = homeDir;

const regularMessage = () => {
  console.log(`\nYou are currently in  ==>  ${currentWorkingDir}`);
  console.log(`I wait for your command: \n`);
};

const executionCommand = async (command) => {
  const cmdArr = command.split(" ");
  const cmd = cmdArr[0];

  if (commandsList[cmd] !== cmdArr.length - 1) {
    console.log("Invalid input. Try again");
    return;
  }

  if (cmd == "up") {
    currentWorkingDir = upCommand(currentWorkingDir);
  } else if (cmd == "cd") {
    currentWorkingDir = cdCommand(currentWorkingDir, cmdArr[1]);
  }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(`Welcome to the File Manager, ${userName}!`);
regularMessage();

rl.on("line", (line) => {
  executionCommand(line).then(regularMessage()).catch();
});

rl.on("exit", () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  rl.close();
});
