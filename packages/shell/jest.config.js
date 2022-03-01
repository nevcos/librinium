module.exports = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ["./src"],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    "^.+\\.tsx?$": "esbuild-runner/jest"
  },

  // Additional Jest setup
  setupFilesAfterEnv: [
    "./src/jest-setup.ts"
  ],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

  // Module file extensions for importing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // The test environment that will be used for testing.
  // The default environment in Jest is a Node.js environment. If you are building a web app,
  // you can use a browser-like environment through jsdom instead.
  testEnvironment: "jsdom"
};
