module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@fs-helpers/(.*)': '<rootDir>/src/fs-helpers/$1',
  },
};
