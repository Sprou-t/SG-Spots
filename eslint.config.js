import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    extends: [
      "eslint:recommended",
      "plugin:prettier/recommended", // Integrates Prettier with ESLint
      "prettier" // Turns off ESLint rules that conflict with Prettier
    ],
    plugins: ["prettier"],
    rules: {
      "no-console": "off",
      "eqeqeq": "warn",
      "no-invalid-this": "error",
      "no-return-assign": "error",
      "no-unused-vars": ["warn", { "argsIgnorePattern": "req|res|next|__" }],
      "indent": ["error", 4, { "SwitchCase": 1 }],
      "quotes": ["error", "single"],
      "max-len": ["error", { "code": 120 }],
      "prefer-const": "error",
      "no-var": "error",
      "arrow-spacing": "error",
      "prettier/prettier": [
        "error",
        {
          printWidth: 80,
          tabWidth: 4,
          useTabs: true,
          semi: true,
          singleQuote: false,
          quoteProps: "as-needed",
          jsxSingleQuote: false,
          trailingComma: "es5",
          bracketSpacing: true,
          bracketSameLine: false,
          arrowParens: "always",
          requirePragma: false,
          insertPragma: false,
          proseWrap: "preserve",
          htmlWhitespaceSensitivity: "css",
          endOfLine: "lf",
          embeddedLanguageFormatting: "auto",
          singleAttributePerLine: false
        }
      ]
    }
  }
];
