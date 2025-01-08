import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  {
    env: {
      browser: true,
      node: true,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];