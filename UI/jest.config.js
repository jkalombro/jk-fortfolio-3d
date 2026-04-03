module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathPattern: '.*\\.spec\\.ts$',
  transformIgnorePatterns: ['node_modules/(?!(.*\\.mjs$|angular-three|ngxtension))'],
  moduleNameMapper: {
    '^three/examples/jsm/(.*)$': '<rootDir>/src/__mocks__/three-examples.js',
  },
  coverageThreshold: {
    global: {
      lines: 100,
      functions: 100,
      branches: 100,
      statements: 100,
    },
  },
};
