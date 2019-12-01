module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    path: true
  },
  parserOptions: {
    ecmaVersion: 2018
  },

  rules: { "no-underscore-dangle": "off" },
  extends: ["airbnb-base", "prettier"]
};
