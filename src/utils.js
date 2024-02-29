import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// utils.js
let currentId = 0;

export function generateUniqueId() {
  currentId += 1;
  return currentId;
}

export default __dirname;
