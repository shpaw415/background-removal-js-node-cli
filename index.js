#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var background_removal_node_1 = require("@imgly/background-removal-node");
var log_update_1 = require("log-update");
var fs_1 = require("fs");
var packageJson = JSON.parse(fs_1.default.readFileSync("./package.json", "utf-8"));
var program = new commander_1.Command();
program
    .name("background-removal-js-node-cli")
    .description("CLI tool for background and foreground removal")
    .version(packageJson.version);
program
    .command("rmbg")
    .description("Remove background from an image")
    .requiredOption("-i, --input <path>", "Input image path")
    .requiredOption("-o, --output <path>", "Output image path")
    // small | medium | large
    .option("-m, --model <model>", "Model to use for background removal (small, medium, large)", "medium")
    .option("-f, --format <format>", "Output image format (png, jpeg, x-alpha8, x-rgba8, webp)", "png")
    .option("-q, --quality <quality>", "Output image quality (only for jpeg and webp, 0-100)", "80")
    .option("-d, --debug", "Enable debug mode to save intermediate results", false)
    .action(function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var inputImage, frames, index, currentProcess, totalProcess, currentKey, outputImage, buffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                inputImage = new Blob([fs_1.default.readFileSync(options.input)]);
                frames = ["-", "\\", "|", "/"];
                index = 0;
                currentProcess = 0;
                totalProcess = 0;
                currentKey = "";
                setInterval(function () {
                    var frame = frames[(index = ++index % frames.length)];
                    if (totalProcess === 0)
                        return (0, log_update_1.default)("".concat(frame, " Initializing..."));
                    (0, log_update_1.default)("".concat(frame, " ").concat(currentKey, ": ").concat(Math.round((currentProcess / totalProcess) * 100), "%"));
                }, 80);
                return [4 /*yield*/, (0, background_removal_node_1.removeBackground)(inputImage, {
                        model: options.model,
                        output: {
                            format: ["image", options.format].join("/"),
                            quality: parseInt(options.quality) / 10,
                        },
                        debug: options.debug,
                        progress: function (key, current, total) {
                            var args_3 = [];
                            for (var _i = 3; _i < arguments.length; _i++) {
                                args_3[_i - 3] = arguments[_i];
                            }
                            currentProcess = current;
                            totalProcess = total;
                            currentKey = key;
                        },
                    })];
            case 1:
                outputImage = _a.sent();
                return [4 /*yield*/, outputImage.arrayBuffer()];
            case 2:
                buffer = _a.sent();
                fs_1.default.writeFileSync(options.output, new Uint8Array(buffer));
                console.log("Background removed and saved to ".concat(options.output));
                process.exit(0);
                return [2 /*return*/];
        }
    });
}); });
program
    .command("rmfg")
    .description("Remove forground from an image")
    .requiredOption("-i, --input <path>", "Input image path")
    .requiredOption("-o, --output <path>", "Output image path")
    // small | medium | large
    .option("-m, --model <model>", "Model to use for background removal (small, medium, large)", "medium")
    .option("-f, --format <format>", "Output image format (png, jpeg, x-alpha8, x-rgba8, webp)", "png")
    .option("-q, --quality <quality>", "Output image quality (only for jpeg and webp, 0-100)", "80")
    .option("-d, --debug", "Enable debug mode to save intermediate results", false)
    .action(function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var inputImage, frames, index, currentProcess, totalProcess, currentKey, outputImage, buffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                inputImage = new Blob([fs_1.default.readFileSync(options.input)]);
                frames = ["-", "\\", "|", "/"];
                index = 0;
                currentProcess = 0;
                totalProcess = 0;
                currentKey = "";
                setInterval(function () {
                    var frame = frames[(index = ++index % frames.length)];
                    if (totalProcess === 0)
                        return (0, log_update_1.default)("".concat(frame, " Initializing..."));
                    (0, log_update_1.default)("".concat(frame, " ").concat(currentKey, ": ").concat(Math.round((currentProcess / totalProcess) * 100), "%"));
                }, 80);
                return [4 /*yield*/, (0, background_removal_node_1.removeForeground)(inputImage, {
                        model: options.model,
                        output: {
                            format: ["image", options.format].join("/"),
                            quality: parseInt(options.quality) / 10,
                        },
                        debug: options.debug,
                        progress: function (key, current, total) {
                            var args_3 = [];
                            for (var _i = 3; _i < arguments.length; _i++) {
                                args_3[_i - 3] = arguments[_i];
                            }
                            currentProcess = current;
                            totalProcess = total;
                            currentKey = key;
                        },
                    })];
            case 1:
                outputImage = _a.sent();
                return [4 /*yield*/, outputImage.arrayBuffer()];
            case 2:
                buffer = _a.sent();
                fs_1.default.writeFileSync(options.output, new Uint8Array(buffer));
                console.log("Background removed and saved to ".concat(options.output));
                process.exit(0);
                return [2 /*return*/];
        }
    });
}); });
program.parse(process.argv);
