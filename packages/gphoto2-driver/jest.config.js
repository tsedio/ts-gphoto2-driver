module.exports = {
  ...require("../../base.jest.config")(__dirname),
  coverageThreshold: {
    global: {
      branches: 3.75,
      functions: 32.04,
      lines: 34.04,
      statements: 33.7
    }
  }
}
