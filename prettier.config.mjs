/**
 * @type {import("prettier").Config}
 * @see https://prettier.io/docs/en/configuration.html
 */
const config = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-jsdoc",
    "prettier-plugin-prisma",
    "prettier-plugin-tailwindcss",
  ],
  tabWidth: 2,
  printWidth: 120,
  trailingComma: "all",
  bracketSpacing: true,
  semi: true,
  singleQuote: false,
  arrowParens: "always",
  importOrder: ["react", "next", "next/(.*)$", "^@/components/(.*)$", "^@/(.*)$", "^[./]", "<THIRD_PARTY_MODULES>"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
