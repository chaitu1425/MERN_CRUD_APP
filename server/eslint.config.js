module.exports = [
  {
    files: ["server/**/*.js"], // ✅ only .js files inside server/
    rules: {
      semi: "error",
      "no-unused-vars": "warn",
    },
  },
];
