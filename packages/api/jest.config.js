module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '/__tests__/.*\\.test\\.(ts)$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
