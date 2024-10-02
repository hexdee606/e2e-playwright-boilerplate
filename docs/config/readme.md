# Configuration Modules

## Overview

This repository includes two important configuration modules for your Node.js application: `env.conf.js` and `global.conf.js`. Together, they provide a centralized way to manage environment-specific settings and global configurations, ensuring your application operates smoothly across different environments.

## 1. Environment Configuration Module (`env.conf.js`)

The `env.conf.js` module manages environment-specific settings and configurations for the application.

### Features

- **Environment Management**: Supports multiple environments, with a default set to 'int' (integration). Easily switch environments using the `E2E` environment variable.
- **Configurable URLs**: Provides base URLs for frontend and backend services (REST and GraphQL).

### Structure

The module exports an object containing:

- **env**: The current environment, defaulting to 'int'.
- **configs**: An object with configurations for various environments, including:
  - **frontend**: Base URL for the frontend application.
  - **backend**: 
    - **api**: Base URL for the REST API.
    - **gql**: Base URL for the GraphQL API.

### Usage

To access the current environment's configuration:

```javascript
const envConf = require('./env.conf.js');

// Access the current environment configuration
const currentConfig = envConf.configs[envConf.env];

// Example: Logging the frontend URL
console.log('Frontend URL:', currentConfig.frontend.url);
```

## 2. Global Configuration Module (`global.conf.js`)

The `global.conf.js` module sets up global configuration variables and paths for the Node.js application.

### Features

- **Global Access**: Provides configuration details that can be accessed globally throughout the application.
- **Flexible Environment Configuration**: Works with environment variables to enable easy switching between configurations.
- **Common Variables**: Defines paths for commonly used resources and shared data structures.

### Structure

The module defines `global.envConf` with the following properties:

- **frontend**:
    - `url`: The base URL for the frontend application.
- **backend**:
    - `apiUrl`: The backend REST API URL.
    - `gqlUrl`: The GraphQL API URL.
    - **headers**:
        - `api`: Default headers for REST API requests.
        - `gql`: Default headers for GraphQL requests.

### Environment Variables

Utilizes the following environment variables:

- **E2E**: Specifies the current environment (e.g., 'int', 'staging', 'production').
- **GQL_TOKEN**: Optional authorization token for GraphQL requests.

### Common Variables

- **FILE_PATH**: Path to common resources or files used throughout the application.

### Global Utilities

Several utility modules are available globally:

- `global.TestData`: Common test data.
- `global.AssertiveStrings`: UI text data for validation.
- `global.ApiHelper`: Utility for managing API requests.
- `global.GraphqlHelper`: Utility for managing GraphQL requests.
- `global.JsonHelper`: Utility for handling JSON filtering.
- `global.PlaywrightActions`: Utility for Playwright-specific actions.
- `global.BrowserStorageHelper`: Utility for managing browser storage.
- `global.CommonFunctions`: Shared functions for use across tests.

### Logging

- **global.verbose**: A boolean that enables verbose logging for detailed output during execution.

### Usage

You can access global configurations and utilities anywhere in your application:

```javascript
// Accessing the frontend URL
console.log('Frontend URL:', envConf.frontend.url);

// Accessing the backend API URL
console.log('Backend API URL:', envConf.backend.apiUrl);

// Utilizing a helper function
ApiHelper.someFunction();
```

## Author

**Hexdee606**  
*Date: 2024-09-21*

## Notes

- Ensure to define necessary environment variables before running the application to avoid configuration issues.
- Modify the header properties in the `headers` section of `global.conf.js` as needed for specific API integrations.