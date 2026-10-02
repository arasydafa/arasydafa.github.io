/** @type {import('tailwindcss').Config} */
export default {
  presets: [require('@omega-os/ui/tailwind.preset.js')],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    './node_modules/@omega-os/ui/dist/**/*.js',
    // Mirrors the local checkout layout (Personal/portfolio + Project/omega-os).
    // Keep in sync with the CI checkout paths in .github/workflows/deploy.yml.
    '../../Project/omega-os/src/**/*.{ts,tsx}',
  ],
};
