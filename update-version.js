#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, "package.json"), "utf-8")
);

const versionContent = `export const VERSION = "${packageJson.version}";\n`;

fs.writeFileSync(path.join(__dirname, "version.ts"), versionContent);

console.log(`Updated version.ts to ${packageJson.version}`);
