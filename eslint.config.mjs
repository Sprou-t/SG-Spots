import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

/** @type {import('eslint').Linter.Config} */
export default {
  root: true,
  files: ["**/*.{js,mjs,cjs,jsx}"],
  languageOptions: {
    globals: globals.browser,
  },
  plugins: ["prettier"], // Add Prettier as a plugin
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended" // Integrate Prettier with ESLint
  ],
  rules: {
    "prettier/prettier": "error", // Enforce Prettier rules as ESLint errors
    "react/react-in-jsx-scope": "off", // Example: Adjust specific rules as needed
    "import/no-useless-path-segments": "off",
    "import/no-named-as-default": "off",
    "import/no-cycle": "off",
    "import/no-extraneous-dependencies": ["error", { "devDependencies": false }]
  },
};
