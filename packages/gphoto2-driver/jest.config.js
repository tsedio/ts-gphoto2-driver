module.exports = {
  ...require("../../base.jest.config")(__dirname),
  coverageThreshold: {
    global: {
      branches: 2.87,
      functions: 4.98,
      lines: 6.86,
      statements: 6.77
    }
  }
}
