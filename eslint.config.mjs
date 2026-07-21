// @ts-check

import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig( 
  { 
    files: ['**/*.{js,ts}'],
    ignores: [
      "**/dist",
      "**/jest.config.js",
      "build",
      "coverage/*",
      "node_modules",
    ],
    extends: [js.configs.recommended, tseslint.configs.recommended] }
);
