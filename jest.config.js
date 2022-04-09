module.exports = {
  setupFilesAfterEnv: [ './jest.setup.js' ],
  testEnvironment: 'jsdom',
  watchPathIgnorePatterns: [
    '<rootDir>/cypress/',
    '<rootDir>/static/',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/cypress/',
    '<rootDir>/static/',
  ],
}
