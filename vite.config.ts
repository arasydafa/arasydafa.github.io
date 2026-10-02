import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Resolve through the installed dependency so the same config works on any
// machine and in CI. `file:` installs link to the real package directory.
const uiPkgDir = path.resolve(__dirname, 'node_modules/@omega-os/ui');
const uiSrc = path.join(uiPkgDir, 'src/index.ts');
const uiRealDir = fs.existsSync(uiPkgDir) ? fs.realpathSync(uiPkgDir) : uiPkgDir;

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Dev always uses UI source; published consumers resolve dist instead.
    // Exact match only so deep imports (tokens.css) keep resolving normally.
    alias: [
      {
        find: /^@omega-os\/ui$/,
        replacement: uiSrc,
      },
    ],
  },
  server: {
    fs: {
      // Linked `file:` packages live outside the project root.
      allow: [process.cwd(), uiRealDir],
    },
  },
});
