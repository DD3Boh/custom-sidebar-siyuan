module.exports = {
  extends: [
    'plugin:vue/vue3-essential',
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    "turbo",
    "prettier",
  ],

  parser: "@typescript-eslint/parser",

  overrides: [
  ],

  plugins: ["@typescript-eslint", "prettier"],

  rules: {
    // Note: you must disable the base rule as it can report incorrect errors
    semi: "off",
    quotes: "off",
    "no-undef": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "turbo/no-undeclared-env-vars": "off",
    "prettier/prettier": "error",
  },
}
