module.exports = {
  ...require("../../base.jest.config")(__dirname),
  coverageThreshold: {
    global: {
      branches: 91.89,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
}
