# WebdriverIO UI Automation (TypeScript)

This project automates UI testing for a web application using [WebdriverIO](https://webdriver.io/) with TypeScript.

## Framework Architecture Overview

- **WebdriverIO**: Main test runner and automation framework.
- **TypeScript**: Strongly typed language for maintainable test code.
- **Page Object Model (POM)**: All UI interactions are abstracted into page objects under `test/pageobjects/`.
- **Test Specs**: Test scenarios are defined in `test/specs/` using Mocha and WDIO APIs.
- **Configuration**: Multiple config files in `config/` for shared, Chrome-only, and Firefox-only runs.
- **Visual Regression**: Baseline images and visual comparison via `@wdio/visual-service`.
- **Reporting**: Allure and other reporters for test results and diagnostics.
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

### Generating and Viewing Allure Reports
After running tests, generate and open the Allure report:
```sh
npm run allure:report
```
Or, reports are automatically generated and opened after test completion (see `onComplete` in `wdio.conf.ts`).

### Running Tests in Docker (Bonus)
Build Docker image:
```sh
docker build -t webdriverio-tests .
```
Run tests in Docker:
```sh
docker run --rm -v %cd%/allure-results:/app/allure-results webdriverio-tests
```
> _Note: You may need to create a `Dockerfile` with Node.js, Chrome/Firefox, and dependencies installed._

### Project Structure
- `test/pageobjects/` — Page Object classes
- `test/specs/` — Test specifications
- `test/baseline/` — Visual regression baseline images
- `config/` — WebdriverIO configuration files

## Usage
- Use `ContactUsPage.fillContactForm()` to automate the contact form.
- Use `CookieBannerPage.handleCookieBanner()` to handle cookie overlays.
- Use `faker` (via `@faker-js/faker`) for generating random test data in specs.

## Troubleshooting
- If you encounter build errors, ensure your Node.js version is compatible with WebdriverIO dependencies.
- For Windows, ensure Visual Studio with C++ build tools is installed.

## CI Build & Test Reports (Bonus)
- [CI Build Status](#) <!-- Replace # with actual CI link -->
- [Allure Test Report](#) <!-- Replace # with actual Allure report link -->

## License
MIT
