const fs = require('fs');
const path = require('path');

const themeColors = require('../src/config/theme-colors.json');

function generateThemeCSS() {
  const cssVariables = {
    light: [],
    dark: []
  };

  // Convert camelCase to kebab-case
  const toKebabCase = (str) => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

  // Generate CSS variables for light mode
  Object.entries(themeColors.light).forEach(([key, value]) => {
    const cssVar = `  --${toKebabCase(key)}: ${value};`;
    cssVariables.light.push(cssVar);
  });

  // Generate CSS variables for dark mode
  Object.entries(themeColors.dark).forEach(([key, value]) => {
    const cssVar = `  --${toKebabCase(key)}: ${value};`;
    cssVariables.dark.push(cssVar);
  });

  const themeCSS = `/* AUTO-GENERATED - DO NOT EDIT MANUALLY */
/* Edit src/config/theme-colors.json instead and run: npm run generate:theme */

:root {
  --radius: 0.625rem;
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

  return themeCSS;
}

// Generate and save the theme CSS
const generatedCSS = generateThemeCSS();
const outputPath = path.join(__dirname, '../src/styles/theme-variables.css');

// Ensure the directory exists
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, generatedCSS);
console.log('✅ Theme CSS generated successfully at src/styles/theme-variables.css');
