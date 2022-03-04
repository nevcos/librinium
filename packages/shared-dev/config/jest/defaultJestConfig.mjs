export function getDefaultJestConfig() {
  return {
    // root of the source code
    rootDir: "./src",

    // ignore some imports
    moduleNameMapper: {
      "\\.(css|scss)$": "<rootDir>/../../shared-dev/config/jest/emptyModuleMock.ts"
    },

    // use esbuild for faster tests
    transform: {
      "^.+\\.tsx?$": "esbuild-runner/jest"
    },

    // setup files
    setupFilesAfterEnv: [
      "<rootDir>/../../shared-dev/config/jest/documentCreateRangeMock.ts",
      "<rootDir>/../../shared-dev/config/jest/setupJestGlobalReact.ts"
    ],

    // jsdom is required to test webapp code
    testEnvironment: "jsdom"
  };
}
