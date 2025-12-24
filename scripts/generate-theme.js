const fs = require('fs');
const path = require('path');

// ============================================================================
// BASE COLORS - Edit these to update the entire theme
// ============================================================================
const BASE_COLORS = {
  primary: '#2B2B2B',    // Dark gray/black
  secondary: '#707070',  // Medium gray
  accent: '#5B9BD5',     // Blue from logo
};

// ============================================================================
// Color Manipulation Helpers
// ============================================================================

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function lighten(hex, percent) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const amount = Math.round(255 * (percent / 100));
  const r = Math.min(255, rgb.r + amount);
  const g = Math.min(255, rgb.g + amount);
  const b = Math.min(255, rgb.b + amount);

  return rgbToHex(r, g, b);
}

function darken(hex, percent) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const amount = Math.round(255 * (percent / 100));
  const r = Math.max(0, rgb.r - amount);
  const g = Math.max(0, rgb.g - amount);
  const b = Math.max(0, rgb.b - amount);

  return rgbToHex(r, g, b);
}

// ============================================================================
// Theme Generation
// ============================================================================

function generateTheme() {
  return {
    light: {
      background: '#FFFFFF',
      foreground: BASE_COLORS.primary,
      card: '#F9FAFB',
      cardForeground: BASE_COLORS.primary,
      popover: '#FFFFFF',
      popoverForeground: BASE_COLORS.primary,
      primary: BASE_COLORS.primary,
      primaryForeground: '#FFFFFF',
      secondary: BASE_COLORS.secondary,
      secondaryForeground: '#FFFFFF',
      muted: '#F3F4F6',
      mutedForeground: BASE_COLORS.secondary,
      accent: BASE_COLORS.accent,
      accentForeground: '#FFFFFF',
      destructive: '#EF4444',
      border: '#E5E7EB',
      input: '#F9FAFB',
      ring: BASE_COLORS.accent,
    },
    dark: {
      background: darken(BASE_COLORS.primary, 10),
      foreground: '#FAFAFA',
      card: lighten(BASE_COLORS.primary, 8),
      cardForeground: '#FAFAFA',
      popover: lighten(BASE_COLORS.primary, 5),
      popoverForeground: '#FAFAFA',
      primary: lighten(BASE_COLORS.primary, 70),
      primaryForeground: darken(BASE_COLORS.primary, 5),
      secondary: lighten(BASE_COLORS.secondary, 20),
      secondaryForeground: '#FFFFFF',
      muted: lighten(BASE_COLORS.primary, 12),
      mutedForeground: lighten(BASE_COLORS.secondary, 30),
      accent: BASE_COLORS.accent,
      accentForeground: '#FFFFFF',
      destructive: '#F87171',
      border: lighten(BASE_COLORS.primary, 18),
      input: lighten(BASE_COLORS.primary, 10),
      ring: BASE_COLORS.accent,
    }
  };
}

// ============================================================================
// CSS Generation
// ============================================================================

function toKebabCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function generateThemeCSS(theme) {
  const cssVariables = {
    light: [],
    dark: []
  };

  // Generate CSS variables for light mode
  Object.entries(theme.light).forEach(([key, value]) => {
    cssVariables.light.push(`  --${toKebabCase(key)}: ${value};`);
  });

  // Generate CSS variables for dark mode
  Object.entries(theme.dark).forEach(([key, value]) => {
    cssVariables.dark.push(`  --${toKebabCase(key)}: ${value};`);
  });

  return `/* AUTO-GENERATED - DO NOT EDIT MANUALLY */
/* Edit scripts/generate-theme.js BASE_COLORS and run: pnpm theme */

:root {
  --radius: 0.425rem;
${cssVariables.light.join('\n')}
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
${cssVariables.dark.join('\n')}
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}
`;
}

// ============================================================================
// Main Execution
// ============================================================================

console.log('🎨 Generating theme from base colors...\n');
console.log(`   Primary:   ${BASE_COLORS.primary}`);
console.log(`   Secondary: ${BASE_COLORS.secondary}`);
console.log(`   Accent:    ${BASE_COLORS.accent}\n`);

// Generate theme colors
const theme = generateTheme();

// Generate CSS
const generatedCSS = generateThemeCSS(theme);

// Write CSS file
const outputPath = path.join(__dirname, '../src/styles/theme-variables.css');
const outputDir = path.dirname(outputPath);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, generatedCSS);

console.log('✅ Theme CSS generated successfully!');
console.log(`   Output: src/styles/theme-variables.css\n`);
console.log('💡 Preview generated colors:');
console.log(`   Light muted: ${theme.light.muted}`);
console.log(`   Light border: ${theme.light.border}`);
console.log(`   Dark background: ${theme.dark.background}`);
console.log(`   Dark card: ${theme.dark.card}`);
