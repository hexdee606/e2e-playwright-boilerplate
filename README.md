# E2E Playwright Boilerplate

![E2E Playwright Boilerplate](https://via.placeholder.com/800x200.png?text=E2E+Playwright+Boilerplate) <!-- Replace with an actual image URL -->

## Overview

The **E2E Playwright Boilerplate** is a powerful testing framework using Playwright for GraphQL and REST APIs, equipped with support for reporting, BDD, and more. This boilerplate includes a set of utilities, configuration files, and organized directories to streamline test development and execution.

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Documentation](#documentation)
- [Utilities](#utilities)
- [Running Tests](#running-tests)
- [Python Tests](#python-tests)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Project Structure

```
e2e-playwright-boilerplate/
├── .gitignore
├── package.json
├── playwright.config.js
├── test.py
├── config/
│   ├── env.conf.js
│   └── global.conf.js
├── docs/
│   ├── config/
│   │   └── [Config Documentation](docs/config/readme.md)
│   └── src/
│       ├── [Source Documentation](docs/src/readme.md)
│       └── utils/
│           ├── [ApiHelper](docs/src/utils/ApiHelper.md)
│           ├── [BrowserStorageHelper](docs/src/utils/BrowserStorageHelper.md)
│           ├── [CommonFunctions](docs/src/utils/CommonFunctions.md)
│           ├── [GraphqlHelper](docs/src/utils/GraphqlHelper.md)
│           ├── [JsonHelper](docs/src/utils/JsonHelper.md)
│           └── [PlaywrightActions](docs/src/utils/PlaywrightActions.md)
├── src/
│   ├── api/
│   │   ├── models/
│   │   │   └── .gitkeep
│   │   └── pages/
│   │       └── .gitkeep
│   ├── assets/
│   │   └── .gitkeep
│   ├── data/
│   │   ├── AssertiveStrings.js
│   │   └── TestData.js
│   ├── downloads/
│   │   └── .gitkeep
│   ├── graphql/
│   │   ├── models/
│   │   │   └── .gitkeep
│   │   ├── mutations/
│   │   │   └── .gitkeep
│   │   ├── pages/
│   │   │   └── .gitkeep
│   │   └── queries/
│   │       └── .gitkeep
│   ├── tests/
│   │   ├── features/
│   │   │   └── .gitkeep
│   │   ├── pages/
│   │   │   └── .gitkeep
│   │   └── step_definitions/
│   │       └── .gitkeep
│   └── utils/
│       ├── ApiHelper.js
│       ├── BrowserStorageHelper.js
│       ├── CommonFunctions.js
│       ├── GraphqlHelper.js
│       ├── JsonHelper.js
│       └── PlaywrightActions.js
```

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hexdee606/e2e-playwright-boilerplate.git
   cd e2e-playwright-boilerplate
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run Playwright install to set up browsers:**
   ```bash
   npx playwright install
   ```

## Configuration

The configuration files are located in the `config/` directory:

- `env.conf.js`: Contains environment-specific configurations.
- `global.conf.js`: Global settings applicable to all tests.

## Documentation

Detailed documentation is available for various components:

- [Config Documentation](docs/config/readme.md)
- [Source Documentation](docs/src/readme.md)

### Utilities Documentation

For detailed descriptions of each utility, refer to their respective pages:

- [ApiHelper](docs/src/utils/ApiHelper.md)
- [BrowserStorageHelper](docs/src/utils/BrowserStorageHelper.md)
- [CommonFunctions](docs/src/utils/CommonFunctions.md)
- [GraphqlHelper](docs/src/utils/GraphqlHelper.md)
- [JsonHelper](docs/src/utils/JsonHelper.md)
- [PlaywrightActions](docs/src/utils/PlaywrightActions.md)

## Utilities

The `src/utils/` directory contains several helper modules that enhance testing capabilities:

- **ApiHelper.js**: Functions for API interactions.
- **BrowserStorageHelper.js**: Functions for managing browser storage (local and session).
- **CommonFunctions.js**: Commonly used functions across tests.
- **GraphqlHelper.js**: Functions for interacting with GraphQL APIs.
- **JsonHelper.js**: Functions for handling JSON data.
- **PlaywrightActions.js**: Utility methods for interacting with Playwright.

## Running Tests

To run the tests, use the following command:

```bash
npx playwright test
```

## Scripts

The following scripts are available in the `package.json` for various testing needs:

- **Run End-to-End Tests**:
  ```bash
  npm run test:e2e
  ```
- **Run Parallel Tests**:
  ```bash
  npm run test:parallel
  ```
- **Run Smoke Tests**:
  ```bash
  npm run test:smoke
  ```
- **Run Debug Tests**:
  ```bash
  npm run test:debug
  ```
- **Generate Allure Reports**:
  ```bash
  npm run test:report-generate
  ```
- **Serve Allure Reports**:
  ```bash
  npm run test:report-serve
  ```
- **Open Allure Reports**:
  ```bash
  npm run test:report-open
  ```

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is licensed under the CC0-1.0 License.

## Author

Hexdee606  
Date: 2024-09-22

---

For further assistance, please refer to the documentation or open an issue in the repository.