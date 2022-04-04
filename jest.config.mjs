export default {
  // root of the source code
  rootDir: "./src",

  // ignore some imports
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/../config/jest/emptyModuleMock.ts",
    "\\.svg$": "<rootDir>/../config/jest/stringModuleMock.ts"
  },

  // use esbuild for faster tests
  transform: {
    "\\.tsx?$": "esbuild-runner/jest"
  },

  // setup files
  setupFilesAfterEnv: [
    "<rootDir>/../config/jest/documentCreateRangeMock.ts",
    "<rootDir>/../config/jest/setupJestGlobalReact.ts"
  ],

  // jsdom is required to test webapp code
  testEnvironment: "jsdom"
};
