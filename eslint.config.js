// @ts-check

import eslint from './node_modules/@eslint/js';
import tseslint from './node_modules/typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
);