import fs from "node:fs";
import path from "node:path";
import JavaScriptObfuscator from "javascript-obfuscator";

const dir = process.argv[2];
if (!dir) throw new Error("Missing build dir");

function walk(p, out = []) {
  for (const n of fs.readdirSync(p)) {
    const f = path.join(p, n);
    const s = fs.statSync(f);
    if (s.isDirectory()) walk(f, out);
    else out.push(f);
  }
  return out;
}

for (const file of walk(dir)) {
  if (!file.endsWith(".bundle")) continue;
  // if (file.endsWith(".container.js.bundle")) continue; // giữ federation container

  const code = fs.readFileSync(file, "utf8");
  const out = JavaScriptObfuscator.obfuscate(code, {
    // compact: true,
    // identifierNamesGenerator: 'hexadecimal',
    // stringArray: true,
    // stringArrayThreshold: 0.75,
    // rotateStringArray: true,
    // simplify: true,
    // deadCodeInjection: false,
    // controlFlowFlattening: false,
    // renameGlobals: false,
    // renameProperties: false,
    compact: true,
    identifierNamesGenerator: "hexadecimal",
    stringArray: false,
    renameGlobals: false,
    renameProperties: false,
    controlFlowFlattening: false,
    deadCodeInjection: false,
  }).getObfuscatedCode();

  fs.writeFileSync(file, out, "utf8");
  console.log("obfuscated:", file);
}
