module.exports = {
  setupFilesAfterEnv: [ './jest.setup.js' ],
  testEnvironment: 'jsdom',
  watchPathIgnorePatterns: [
    '<rootDir>/.cache',
    '<rootDir>/cypress/',
    '<rootDir>/static/',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/.cache',
    '<rootDir>/cypress/',
    '<rootDir>/static/',
  ],
}
