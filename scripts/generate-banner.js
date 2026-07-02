#!/usr/bin/env node

/**
 * ============================================================================
 * 🎨 generate-banner.js — Programmatic Banner SVG Generator
 * ============================================================================
 *
 * Generates animated banner SVGs with custom text, colors, and effects.
 * Uses the capsule-render API as a primary source, with a local SVG fallback
 * generator for offline/custom use cases.
 *
 * Usage:
 *   node scripts/generate-banner.js [options]
 *
 * Options:
 *   --text     "Praveen"        Text to display on the banner
 *   --type     hero|footer        Banner type (default: hero)
 *   --colors   "#7c3aed,#06b6d4"  Comma-separated gradient colors
 *   --output   path/to/file.svg   Output file path
 *   --height   250                Banner height in pixels
 *   --style    waving|rect|...    capsule-render animation style
 *
 * Examples:
 *   node scripts/generate-banner.js --text "John Doe" --type hero
 *   node scripts/generate-banner.js --text "Thanks!" --type footer --height 120
 *   node scripts/generate-banner.js --colors "#ec4899,#8b5cf6,#06b6d4"
 *
 * ============================================================================
 */

const fs = require("fs");
const path = require("path");

// ── Default Configuration ────────────────────────────────────────────────────

const DEFAULTS = {
  text: "Praveen",
  subtitle: "Full-Stack Developer | Open Source Enthusiast",
  type: "hero",
  colors: ["#7c3aed", "#06b6d4", "#ec4899"],
  height: 250,
  style: "waving",
  fontFamily: "'Segoe UI', Arial, sans-serif",
  outputDir: path.join(__dirname, "..", "assets", "banners"),
};

// ── Argument Parser ──────────────────────────────────────────────────────────

/**
 * Parses CLI arguments into a config object.
 * Supports --key value pairs.
 *
 * @returns {Object} Parsed configuration merged with defaults.
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const config = { ...DEFAULTS };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--text":
        config.text = args[++i];
        break;
      case "--type":
        config.type = args[++i];
        break;
      case "--colors":
        config.colors = args[++i].split(",").map((c) => c.trim());
        break;
      case "--output":
        config.outputPath = args[++i];
        break;
      case "--height":
        config.height = parseInt(args[++i], 10);
        break;
      case "--style":
        config.style = args[++i];
        break;
      case "--subtitle":
        config.subtitle = args[++i];
        break;
      case "--help":
        console.log(`
  🎨 Banner Generator

  Usage: node generate-banner.js [options]

  Options:
    --text      "Display Text"       Main banner text
    --subtitle  "Subtitle Text"      Secondary text line
    --type      hero | footer        Banner type (default: hero)
    --colors    "#hex1,#hex2,#hex3"  Gradient colors
    --output    path/to/output.svg   Custom output path
    --height    250                   Banner height (px)
    --style     waving               Animation style
    --help                           Show this help message
        `);
        process.exit(0);
        break;
      default:
        console.warn(`Unknown option: ${args[i]}`);
    }
  }

  return config;
}

// ── SVG Generator ────────────────────────────────────────────────────────────

/**
 * Generates a hero banner SVG string with animated gradient, particles,
 * and wave decoration.
 *
 * @param {Object} config - Banner configuration.
 * @returns {string} Complete SVG markup.
 */
function generateHeroBanner(config) {
  const { text, subtitle, colors, height } = config;
  const width = 1200;

  // Generate particle elements
  const particles = Array.from({ length: 12 }, (_, i) => {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height * 0.8);
    const dx = Math.floor(Math.random() * 40 - 20);
    const dy = Math.floor(Math.random() * 40 - 20);
    const dur = (3 + Math.random() * 3).toFixed(1);
    return `
  <circle cx="${x}" cy="${y}" r="2" fill="rgba(255,255,255,0.5)">
    <animate attributeName="opacity" values="0;1;0" dur="${dur}s" repeatCount="indefinite"/>
    <animateTransform attributeName="transform" type="translate" values="0,0;${dx},${dy};0,0" dur="${dur}s" repeatCount="indefinite"/>
  </circle>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      ${colors
        .map(
          (c, i) =>
            `<stop offset="${(i / (colors.length - 1)) * 100}%" stop-color="${c}">
        <animate attributeName="stop-color" values="${colors.join(";")};${
              colors[0]
            }" dur="6s" repeatCount="indefinite"/>
      </stop>`
        )
        .join("\n      ")}
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#grad)"/>
  ${particles}

  <path d="M0,${height - 40} C200,${height - 70} 400,${height - 20} 600,${
    height - 50
  } C800,${height - 80} 1000,${height - 30} ${width},${
    height - 60
  } L${width},${height} L0,${height} Z" fill="rgba(0,0,0,0.15)">
    <animate attributeName="d" values="M0,${height - 40} C200,${height - 70} 400,${height - 20} 600,${height - 50} C800,${height - 80} 1000,${height - 30} ${width},${height - 60} L${width},${height} L0,${height} Z;M0,${height - 50} C200,${height - 30} 400,${height - 70} 600,${height - 40} C800,${height - 60} 1000,${height - 80} ${width},${height - 50} L${width},${height} L0,${height} Z;M0,${height - 40} C200,${height - 70} 400,${height - 20} 600,${height - 50} C800,${height - 80} 1000,${height - 30} ${width},${height - 60} L${width},${height} L0,${height} Z" dur="8s" repeatCount="indefinite"/>
  </path>

  <text x="${width / 2}" y="${
    height * 0.42
  }" text-anchor="middle" font-family="${
    config.fontFamily
  }" font-size="48" font-weight="bold" fill="white" filter="url(#glow)">
    ${text} 👋
  </text>
  <text x="${width / 2}" y="${
    height * 0.6
  }" text-anchor="middle" font-family="${
    config.fontFamily
  }" font-size="20" fill="rgba(255,255,255,0.9)">
    ${subtitle}
  </text>
</svg>`;
}

/**
 * Generates a footer banner SVG string with animated wave effect.
 *
 * @param {Object} config - Banner configuration.
 * @returns {string} Complete SVG markup.
 */
function generateFooterBanner(config) {
  const { colors, height } = config;
  const width = 1200;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
  <defs>
    <linearGradient id="footGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      ${colors
        .map(
          (c, i) =>
            `<stop offset="${(i / (colors.length - 1)) * 100}%" stop-color="${c}">
        <animate attributeName="stop-color" values="${colors.join(";")};${
              colors[0]
            }" dur="6s" repeatCount="indefinite"/>
      </stop>`
        )
        .join("\n      ")}
    </linearGradient>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#footGrad)"/>

  <path d="M0,30 C200,60 400,10 600,40 C800,70 1000,20 ${width},50 L${width},0 L0,0 Z" fill="rgba(0,0,0,0.2)">
    <animate attributeName="d" values="M0,30 C200,60 400,10 600,40 C800,70 1000,20 ${width},50 L${width},0 L0,0 Z;M0,50 C200,20 400,60 600,30 C800,10 1000,60 ${width},30 L${width},0 L0,0 Z;M0,30 C200,60 400,10 600,40 C800,70 1000,20 ${width},50 L${width},0 L0,0 Z" dur="7s" repeatCount="indefinite"/>
  </path>

  <text x="${
    width / 2
  }" y="${height * 0.7}" text-anchor="middle" font-family="${
    config.fontFamily
  }" font-size="14" fill="rgba(255,255,255,0.8)">
    ⭐ Thanks for visiting! Made with ❤️
  </text>
</svg>`;
}

// ── Main Entry Point ─────────────────────────────────────────────────────────

function main() {
  const config = parseArgs();

  console.log(`🎨 Generating ${config.type} banner...`);
  console.log(`   Text: "${config.text}"`);
  console.log(`   Colors: ${config.colors.join(", ")}`);
  console.log(`   Height: ${config.height}px\n`);

  // Generate SVG
  const svg =
    config.type === "footer"
      ? generateFooterBanner(config)
      : generateHeroBanner(config);

  // Determine output path
  const outputPath =
    config.outputPath ||
    path.join(config.outputDir, `${config.type}-banner.svg`);

  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write SVG file
  fs.writeFileSync(outputPath, svg, "utf-8");
  console.log(`✨ Banner saved: ${outputPath}`);
  console.log(`   Size: ${svg.length} bytes\n`);
}

main();
