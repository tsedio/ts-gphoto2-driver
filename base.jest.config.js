// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
const {join} = require("path");
const fixPath = require("normalize-path");
const packageDir = join(__dirname, 'packages');

module.exports = (rootDir) => ({
  rootDir: fixPath(rootDir),
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ["<rootDir>/src/**"],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // moduleDirectories: ["node_modules", "packages"],
  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ["index.ts", "GPUtils.ts"],
  moduleNameMapper: {
    "^@tsed/gphoto2-core$": fixPath(join(packageDir, "gphoto2-core/src")),
    "^@tsed/gphoto2-driver$": fixPath(join(packageDir, "gphoto2-driver/src")),
  },

  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],

  // The test environment that will be used for testing
  testEnvironment: "node",

  // A map from regular expressions to paths to transformers
  transform: {
    "\\.(ts)$": "ts-jest"
  },

  preset: "ts-jest",

  modulePathIgnorePatterns: ["<rootDir>/lib", "<rootDir>/dist"],
  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: []
});
