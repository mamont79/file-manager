import path from "path";
import process from "process";
import { fileURLToPath } from "url";
import os from "node:os";
import readline from "node:readline";

import { getUserName } from "./helpers/getUserName.js";
import { commandsList } from "./helpers/commandsList.js";
import { upCommand } from "./commads/up-command.js";
import { cdCommand } from "./commads/cd-command.js";
import { lsCommand } from "./commads/ls-command.js";
import { catCommand } from "./commads/cat-command.js";
import { addCommand } from "./commads/add-command.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const commandsDir = path.join(__dirname, "commands");
const workigDir = process.cwd();
const homeDir = os.homedir();
const userName = getUserName();

// let currentWorkingDir = homeDir;
let currentWorkingDir = workigDir;

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
  } else if (cmd == "ls") {
    await lsCommand(currentWorkingDir);
  } else if (cmd == "cat") {
    await catCommand(currentWorkingDir, cmdArr[1]);
  } else if (cmd == "add") {
    await addCommand(currentWorkingDir, cmdArr[1]);
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
})
  .on("close", () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    rl.close();
  })
  .on("exit", () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  });
