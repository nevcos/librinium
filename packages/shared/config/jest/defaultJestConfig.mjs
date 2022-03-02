export function getDefaultJestConfig() {
  return {
    // root of the source code
    rootDir: "./src",

    // use esbuild for faster tests
    transform: {
      "^.+\\.tsx?$": "esbuild-runner/jest"
    },

    // setup files
    setupFilesAfterEnv: [
      "<rootDir>/../../shared/config/jest/setupGlobalReact.ts"
    ],

    // jsdom is required to test webapp code
    testEnvironment: "jsdom"
  };
}
