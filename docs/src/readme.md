# 📁 **Project Structure**

This project is organized into a structured directory layout, facilitating easy navigation and understanding of its
components. Below is a breakdown of the folder structure and the purpose of each directory and file.

```
e2e-playwright-boilerplate/
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.js
├── README.md
├── docs/
│   ├── config/
│   │   └── readme.md
│   └── src/
│       └── utils/
│           ├── AccessibilityHelper.md
│           ├── ApiHelper.md
│           ├── BrowserStorageHelper.md
│           ├── CommonFunctions.md
│           ├── GraphqlHelper.md
│           ├── JsonHelper.md
│           └── PlaywrightActions.md
├── resources/
│   ├── config/
│   │   ├── env.config.js
│   │   └── globalEnv.config.js
│   ├── data/
│   │   ├── assertiveStrings.js
│   │   └── testData.js
│   ├── downloads/
│   │   └── .gitkeep
│   └── utils/
│       ├── AccessibilityHelper.js
│       ├── ApiHelper.js
│       ├── BrowserStorageHelper.js
│       ├── CommonFunctions.js
│       ├── GraphqlHelper.js
│       ├── JsonHelper.js
│       └── PlaywrightActions.js
└── src/
    └── tests/
        ├── api/
        │   ├── features/
        │   ├── pages/
        │   └── step_definitions/
        ├── graphql/
        │   ├── features/
        │   ├── mutations/
        │   ├── pages/
        │   ├── queries/
        │   └── step_definitions/
        ├── shared/
        │   ├── contracts/
        │   └── models/
        └── ui/
            ├── features/
            ├── pages/
            └── step_definitions/
```

## 🗂️ **Directory Breakdown**

### `docs/`

This directory contains documentation files that describe the project setup and utility usage.

- **`config/`**: Contains configuration files related to the documentation, such as `readme.md`.
- **`src/`**: Contains documentation for various utility functions (e.g., `ApiHelper.md`, `BrowserStorageHelper.md`,
  etc.).

### `resources/`

This directory holds resource files like configuration files, test data, utilities, and downloaded files.

- **`config/`**: Contains configuration files that define environment-specific settings.
    - **`env.config.js`**: Holds environment-specific configurations for backend URLs and services.
    - **`globalEnv.config.js`**: Contains global environment variables for the application.

- **`data/`**: Contains sample and mock data files used for testing and validation.
    - **`assertiveStrings.js`**: Contains UI validation text or assertive strings.
    - **`testData.js`**: Holds sample or mock test data for test scenarios.

- **`downloads/`**: Placeholder directory for downloaded files.
    - **`.gitkeep`**: A placeholder file to keep the `downloads/` directory tracked in Git.

- **`utils/`**: Contains utility modules for various functions used across the application.
    - **`AccessibilityHelper.js`**: Utility for conducting accessibility tests across applications.
    - **`ApiHelper.js`**: Manages API request/response handling.
    - **`BrowserStorageHelper.js`**: Manages browser storage like localStorage and sessionStorage.
    - **`CommonFunctions.js`**: Contains common functions for use across the application.
    - **`GraphqlHelper.js`**: Utility for managing GraphQL queries and mutations.
    - **`JsonHelper.js`**: Handles operations for working with JSON data.
    - **`PlaywrightActions.js`**: Specific utility for Playwright-related actions used in end-to-end tests.

### `src/`

This is the main source directory containing code files and test cases.

- **`api/`**: Contains files related to API testing.
    - **`models/`**: Defines data models used for API requests and responses.
    - **`pages/`**: Contains logic for making API requests using models and updating data.
    - **`step_definitions/`**: Contains step implementations for API-related test scenarios.

- **`graphql/`**: Contains components related to GraphQL testing.
    - **`models/`**: Defines GraphQL models for use in queries and mutations.
    - **`mutations/`**: Contains GraphQL mutations for modifying data on the server.
    - **`pages/`**: Contains functions that set GraphQL data models.
    - **`queries/`**: Contains GraphQL query definitions to fetch data from the server.
    - **`step_definitions/`**: Contains GraphQL-specific step implementations for testing.

- **`shared/`**: Contains common contracts and models shared across API and GraphQL testing.
    - **`contracts/`**: Contains contract files defining the contract between API/GraphQL services and client apps.
    - **`models/`**: Holds shared models used for API and GraphQL testing.

- **`ui/`**: Contains UI-related testing components.
    - **`features/`**: Defines features written in Gherkin for Behavior-Driven Development (BDD).
    - **`pages/`**: Contains page objects representing web pages in UI tests.
    - **`step_definitions/`**: Contains step definitions for UI testing scenarios.

### Notes

- **`.gitkeep`**: These files are used to track empty directories in Git (e.g., `downloads/`), ensuring that the
  directories remain in version control even when they don't contain files yet.
- As the project evolves, additional files and directories may be added to enhance functionality or accommodate new
  features.

---

## Conclusion

This structured approach to organizing the project ensures maintainability and scalability. By grouping files by their
functionality and type, developers can easily navigate and update the codebase. Whether it's API testing, GraphQL
integrations, or UI testing, this organization streamlines the development and testing process.