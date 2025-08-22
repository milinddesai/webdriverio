
# WebdriverIO UI & API Automation (TypeScript)

This project automates both UI and API testing for web applications using [WebdriverIO](https://webdriver.io/) and [Jest](https://jestjs.io/) with TypeScript.


## Framework Architecture Overview

- **WebdriverIO**: Main test runner and automation framework for UI tests.
- **Jest**: Test runner for API tests (see `api-test/`).
- **TypeScript**: Strongly typed language for maintainable test code.
- **Page Object Model (POM)**: All UI interactions are abstracted into page objects under `test/pageobjects/`.
- **API Client**: Modular API client and schema validation in `api-test/src/`.
- **Test Specs**: UI scenarios in `test/specs/` (Mocha), API scenarios in `api-test/tests/` (Jest).
- **Configuration**: Multiple config files in `config/` for shared, Chrome-only, and Firefox-only runs.
- **Visual Regression**: Baseline images and visual comparison via `@wdio/visual-service`.
- **Reporting**: Allure, JUnit, JSON, and GitHub Actions reporters for test results and diagnostics.
- **Test Data**: Dynamic data generation using `@faker-js/faker`.

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm
- (Windows) Visual Studio with Desktop development with C++ workload

### Installation
```sh
npm install
```


### Running Tests Locally
#### UI Tests
Run with default config:
```sh
npm run wdio
```
Run with Chrome only:
```sh
npm run wdio:chrome
```
Run with Firefox only:
```sh
npm run wdio:firefox
```

#### API Tests
Run all API tests:
```sh
npm run api-test
```


### Generating and Viewing Allure Reports
After running UI or API tests, generate and open the Allure report:
```sh
npm run allure:report
```
Or, reports are automatically generated and opened after test completion (see `onComplete` in `wdio.conf.ts`).


### Running Tests in Docker (Bonus)
Build Docker image:
```sh
docker build -t webdriverio-tests .
```
Run UI tests in Docker:
```sh
docker run --rm -v %cd%/allure-results:/app/allure-results webdriverio-tests
```
Run API tests in Docker:
```sh
docker run --rm webdriverio-tests npm run api-test
```
> _Note: You may need to create a `Dockerfile` with Node.js, Chrome/Firefox, and dependencies installed._


### Project Structure
- `test/pageobjects/` — Page Object classes
- `test/specs/` — UI Test specifications
- `test/baseline/` — Visual regression baseline images
- `config/` — WebdriverIO configuration files
- `api-test/src/clients/` — API client modules
- `api-test/src/validations/` — API response schema validation
- `api-test/tests/` — API test cases


## Usage
- Use `ContactUsPage.fillContactForm()` to automate the contact form (UI).
- Use `CookieBannerPage.handleCookieBanner()` to handle cookie overlays (UI).
- Use `reqresClient` for API requests and `userListSchema` for schema validation (API).
- Use `faker` (via `@faker-js/faker`) for generating random test data in specs.


## Troubleshooting
- If you encounter build errors, ensure your Node.js version is compatible with WebdriverIO and Jest dependencies.
- For Windows, ensure Visual Studio with C++ build tools is installed.


## CI Build & Test Reports
- The GitHub Actions workflow supports running UI tests, API tests, or both. Select `testType` as `web`, `api`, or `both` when triggering the workflow.
- Test results are published as JUnit, JSON, and Allure reports.

## License
MIT
