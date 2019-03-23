const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  testEnvironment: 'node',
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
    'vue'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/renderer/$1'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.ts$': '<rootDir>/node_modules/ts-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: [
    'src/renderer/**/*.{js,ts,vue}',
    '!**/node_modules/**'
  ]
};
