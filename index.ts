#! /usr/bin/env node

import { Command } from "commander";
import {
  removeBackground,
  removeForeground,
} from "@imgly/background-removal-node";
import logUpdate from "log-update";
import fs from "fs";
import path from "path";
import { VERSION } from "./version";

// Get the directory where this script is located
const getPublicPath = () => {
  try {
    // For CommonJS (compiled)
    if (typeof __dirname !== "undefined") {
      const distPath = path.join(
        __dirname,
        "..",
        "node_modules",
        "@imgly",
        "background-removal-node",
        "dist"
      );
      // Convert to file:// URI
      return `file://${distPath}/`;
    }
  } catch (e) {
    // Fallback
  }
  // Default fallback
  return undefined;
};

const publicPath = getPublicPath();

const program = new Command();

program
  .name("background-removal-js-node-cli")
  .description("CLI tool for background and foreground removal")
  .version(VERSION);

type RmbgOptions = {
  input: string;
  output: string;
  model: "small" | "medium" | "large";
  format: "png" | "jpeg" | "x-alpha8" | "x-rgba8" | "webp";
  quality: string;
  debug: boolean;
};

program
  .command("rmbg")
  .description("Remove background from an image")
  .requiredOption("-i, --input <path>", "Input image path")
  .requiredOption("-o, --output <path>", "Output image path")
  // small | medium | large
  .option(
    "-m, --model <model>",
    "Model to use for background removal (small, medium, large)",
    "medium"
  )
  .option(
    "-f, --format <format>",
    "Output image format (png, jpeg, x-alpha8, x-rgba8, webp)",
    "png"
  )
  .option(
    "-q, --quality <quality>",
    "Output image quality (only for jpeg and webp, 0-100)",
    "80"
  )
  .option(
    "-d, --debug",
    "Enable debug mode to save intermediate results",
    false
  )
  .action(async (options: RmbgOptions) => {
    const inputBuffer = fs.readFileSync(options.input);

    // Determine MIME type from file extension
    const ext = path.extname(options.input).toLowerCase();
    const mimeTypes: Record<string, string> = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".webp": "image/webp",
    };
    const mimeType = mimeTypes[ext] || "image/jpeg";

    const inputImage = new Blob([inputBuffer], { type: mimeType });

    const frames = ["-", "\\", "|", "/"];
    let index = 0;
    let currentProcess = 0;
    let totalProcess = 0;
    let currentKey = "";

    setInterval(() => {
      const frame = frames[(index = ++index % frames.length)];
      if (totalProcess === 0) return logUpdate(`${frame} Initializing...`);
      logUpdate(
        `${frame} ${currentKey}: ${Math.round(
          (currentProcess / totalProcess) * 100
        )}%`
      );
    }, 80);

    const outputImage = await removeBackground(inputImage, {
      publicPath,
      model: options.model,
      output: {
        format: ["image", options.format as "png"].join("/") as
          | "image/png"
          | "image/jpeg",
        quality: parseInt(options.quality) / 100,
      },
      debug: options.debug,
      progress(key, current, total, ...args_3) {
        currentProcess = current;
        totalProcess = total;
        currentKey = key;
      },
    });

    const buffer = await outputImage.arrayBuffer();
    fs.writeFileSync(options.output, new Uint8Array(buffer));
    console.log(`Background removed and saved to ${options.output}`);
    process.exit(0);
  });

program
  .command("rmfg")
  .description("Remove forground from an image")
  .requiredOption("-i, --input <path>", "Input image path")
  .requiredOption("-o, --output <path>", "Output image path")
  // small | medium | large
  .option(
    "-m, --model <model>",
    "Model to use for background removal (small, medium, large)",
    "medium"
  )
  .option(
    "-f, --format <format>",
    "Output image format (png, jpeg, x-alpha8, x-rgba8, webp)",
    "png"
  )
  .option(
    "-q, --quality <quality>",
    "Output image quality (only for jpeg and webp, 0-100)",
    "80"
  )
  .option(
    "-d, --debug",
    "Enable debug mode to save intermediate results",
    false
  )
  .action(async (options: RmbgOptions) => {
    const inputBuffer = fs.readFileSync(options.input);

    // Determine MIME type from file extension
    const ext = path.extname(options.input).toLowerCase();
    const mimeTypes: Record<string, string> = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".webp": "image/webp",
    };
    const mimeType = mimeTypes[ext] || "image/jpeg";

    const inputImage = new Blob([inputBuffer], { type: mimeType });

    const frames = ["-", "\\", "|", "/"];
    let index = 0;
    let currentProcess = 0;
    let totalProcess = 0;
    let currentKey = "";

    setInterval(() => {
      const frame = frames[(index = ++index % frames.length)];
      if (totalProcess === 0) return logUpdate(`${frame} Initializing...`);
      logUpdate(
        `${frame} ${currentKey}: ${Math.round(
          (currentProcess / totalProcess) * 100
        )}%`
      );
    }, 80);

    const outputImage = await removeForeground(inputImage, {
      publicPath,
      model: options.model,
      output: {
        format: ["image", options.format as "png"].join("/") as
          | "image/png"
          | "image/jpeg",
        quality: parseInt(options.quality) / 100,
      },
      debug: options.debug,
      progress(key, current, total, ...args_3) {
        currentProcess = current;
        totalProcess = total;
        currentKey = key;
      },
    });

    const buffer = await outputImage.arrayBuffer();
    fs.writeFileSync(options.output, new Uint8Array(buffer));
    console.log(`Background removed and saved to ${options.output}`);
    process.exit(0);
  });

program.parse(process.argv);
