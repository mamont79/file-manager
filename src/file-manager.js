import path from "path";
import process from "process";
import { fileURLToPath } from "url";
import os from "node:os";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const commandsDir = path.join(__dirname, "commands");
const workigDir = process.cwd();
const homeDir = os.homedir();

console.log(commandsDir);
console.log(workigDir);
console.log(homeDir);
