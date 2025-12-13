import config from "eslint-config-love";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ...config,
    files: ['**/*.js', '**/*.ts'],
  }
]);
