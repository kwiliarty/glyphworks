module.exports = {
  setupFilesAfterEnv: [ './jest.setup.js' ],
  testEnvironment: 'jsdom',
  moduleDirectories: [
    '/node_modules/',
    '<rootDir>/main/js-utils/test/',
    '<rootDir>/main/themes',
  ],
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
