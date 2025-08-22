const reporters = ['default',
  ['jest-allure', { outputDirectory: 'allure-results' }],
  'summary',
  ['jest-junit', {
    outputDirectory: './reports/junit-results', // Optional: specify output directory
    outputName: "api-results.xml",        // Optional: specify output filename
    addFileAttribute: "true"         // Optional: add file path attribute
  }]];
if (process.env.CI === 'true') {
  reporters.push(['@matteoh2o1999/github-actions-jest-reporter', {}]);
}
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  testMatch: ['**/api-test/tests/**/*.test.ts'],
  reporters,
  testRunner: "jest-jasmine2"
};