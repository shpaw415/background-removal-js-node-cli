# Background Removal CLI

A command-line tool for removing backgrounds and foregrounds from images using AI. Works with both Node.js and Bun.

[![npm version](https://badge.fury.io/js/background-removal-js-node-cli.svg)](https://www.npmjs.com/package/background-removal-js-node-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

### Global Installation (Recommended)

Install globally using npm:

```bash
npm install -g background-removal-js-node-cli
```

Then use the CLI commands anywhere:

```bash
background-removal-cli rmbg -i input.jpg -o output.png
# or use the shorter alias
rmbg-cli rmbg -i input.jpg -o output.png
```

### Local Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/shpaw415/background-removal-js-node-cli.git
cd background-removal-js-node-cli
npm install
```

Build the CLI:

```bash
npm run build
```

Install locally for development:

```bash
npm link
```

## Usage

### Global Commands (after installing globally)

```bash
# Remove background
background-removal-cli rmbg -i input.jpg -o output.png

# Or use the shorter command
rmbg-cli rmbg -i input.jpg -o output.png

# Remove foreground
background-removal-cli rmfg -i input.jpg -o output.png
```

### Direct Usage

```bash
# With Node.js
node dist/index.js rmbg -i input.jpg -o output.png

# With Bun (from TypeScript source)
bun run index.ts rmbg -i input.jpg -o output.png

# With Bun (from compiled JS)
bun run dist/index.js rmbg -i input.jpg -o output.png
```

### Available Commands

#### Remove Background (`rmbg`)

```bash
background-removal-cli rmbg [options]

Options:
  -i, --input <path>       Input image path (required)
  -o, --output <path>      Output image path (required)
  -m, --model <model>      Model size: small, medium, large (default: medium)
  -f, --format <format>    Output format: png, jpeg, x-alpha8, x-rgba8, webp (default: png)
  -q, --quality <quality>  Quality for jpeg/webp: 0-100 (default: 80)
  -d, --debug              Enable debug mode
  -h, --help               Show help
```

#### Remove Foreground (`rmfg`)

```bash
background-removal-cli rmfg [options]
# Same options as rmbg
```

## Examples

```bash
# Basic background removal
background-removal-cli rmbg -i photo.jpg -o photo-no-bg.png

# High quality with large model
background-removal-cli rmbg -i photo.jpg -o output.png -m large -q 95

# Output as JPEG
background-removal-cli rmbg -i photo.jpg -o output.jpg -f jpeg -q 90

# Remove foreground instead
background-removal-cli rmfg -i photo.jpg -o background-only.png
```

## Development

```bash
# Run in development mode with Bun
bun run dev

# Build for production
npm run build

# Start compiled version
npm start
```

## Publishing to NPM

To publish this package to npm:

1. **Login to npm** (first time only):

   ```bash
   npm login
   ```

2. **Update version** (choose one):

   ```bash
   npm version patch  # 1.0.0 -> 1.0.1
   npm version minor  # 1.0.0 -> 1.1.0
   npm version major  # 1.0.0 -> 2.0.0
   ```

3. **Publish the package**:
   ```bash
   npm publish
   ```

The `prepublishOnly` script will automatically build the project before publishing.

## Requirements

- Node.js >= 18.0.0
- npm or Bun

## Dependencies

- [@imgly/background-removal-node](https://www.npmjs.com/package/@imgly/background-removal-node) - AI-powered background removal
- [commander](https://www.npmjs.com/package/commander) - Command-line interface framework
- [log-update](https://www.npmjs.com/package/log-update) - Progress indicator
- [sharp](https://www.npmjs.com/package/sharp) - Image processing

## License

MIT © [shpaw415](https://github.com/shpaw415)

This project was created using `bun init` and supports both [Bun](https://bun.com) and Node.js runtimes.
