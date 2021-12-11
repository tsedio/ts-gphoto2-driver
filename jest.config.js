// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  rootDir: __dirname,
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ["packages/gphoto2-*/src/**"],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // moduleDirectories: ["node_modules", "packages"],
  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [],
  moduleNameMapper: {
    "^@tsed/gphoto-(.*)$": "<rootDir>/packages/gphoto-$1/src"
  },
  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      branches: 17.06,
      functions: 11.66,
      lines: 23.29,
      statements: 23.13
    }
  },

  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],

  // The test environment that will be used for testing
  testEnvironment: "node",

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/packages/*/src/**/__tests__/**/*.[jt]s?(x)",
    "**/packages/*/src/**/?(*.)+(spec|test).[tj]s?(x)",
    "**/packages/*/test/**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  // A map from regular expressions to paths to transformers
  transform: {
    "\\.(ts)$": "ts-jest"
  },

  preset: "ts-jest",

  modulePathIgnorePatterns: ["<rootDir>/packages/*/lib", "<rootDir>/dist"],
  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: []
};
