import fs from "node:fs";
import path from "node:path";

const buildDir = process.argv[2];

if (!buildDir) {
  throw new Error("Missing build dir");
}

const containerFile = path.join(buildDir, "MoviesApp.container.js.bundle");

if (!fs.existsSync(containerFile)) {
  throw new Error(`Container bundle not found: ${containerFile}`);
}

const exposeChunks = fs
  .readdirSync(buildDir)
  .filter((file) => file.startsWith("__federation_expose_") && file.endsWith(".chunk.bundle"))
  .sort();

if (exposeChunks.length === 0) {
  console.log(`no federation expose chunks found in ${buildDir}`);
  process.exit(0);
}

let containerCode = fs.readFileSync(containerFile, "utf8").trimEnd();

for (const chunkFile of exposeChunks) {
  const chunkPath = path.join(buildDir, chunkFile);
  const chunkCode = fs.readFileSync(chunkPath, "utf8").trim();

  containerCode += `\n;${chunkCode}\n`;
  fs.unlinkSync(chunkPath);
  console.log(`embedded: ${chunkFile}`);
}

fs.writeFileSync(containerFile, `${containerCode}\n`, "utf8");
console.log(`single-bundle ready: ${containerFile}`);
