# 🌍 **Configuration Modules**

## 📌 **Overview**

This repository includes two key configuration modules designed for efficient management of environment-specific and
global configurations within your Node.js application:  
**`env.conf.js`** and **`global.conf.js`**. These modules centralize the management of configurations, ensuring a
consistent and smooth operation across different environments and services.

---

## 🛠️ **1. Environment Configuration Module (`env.conf.js`)**

The **Environment Configuration Module** (`env.conf.js`) helps you manage environment-specific settings and
configurations for your application. It's essential for defining different behaviors and URLs based on the environment (
e.g., development, staging, production).

### 🚀 **Features**

- **🌍 Multi-Environment Support**: Switch seamlessly between environments (default: `int` for integration). Simply
  change the `E2E` environment variable to toggle configurations.
- **🔗 Configurable URLs**: Easily manage base URLs for frontend and backend services (REST and GraphQL APIs).

### 🗂️ **Structure**

The module exports a configuration object with these key properties:

- **`env`**: The active environment, defaulting to `int`.
- **`configs`**: A collection of environment-specific configurations:
    - **`frontend`**: Base URL for the frontend application.
    - **`backend`**:
        - **`api`**: Base URL for the REST API.
        - **`gql`**: Base URL for the GraphQL API.

### 📝 **Usage**

To access the current environment's configuration, simply require the module and reference the desired property:

```javascript
const envConf = require('./env.conf.js');

// Access the current environment's configuration
const currentConfig = envConf.configs[envConf.env];

// Example: Logging the frontend URL
console.log('Frontend URL:', currentConfig.frontend.url);
```

---

## 🌐 **2. Global Configuration Module (`global.conf.js`)**

The **Global Configuration Module** (`global.conf.js`) provides global configuration values that are shared across the
entire application, allowing for easy management of environment variables, paths, and common utilities.

### 🚀 **Features**

- **🌍 Global Access**: Provides a global configuration accessible throughout the application.
- **⚙️ Flexible Environment Configuration**: Supports dynamic switching based on environment variables.
- **🔧 Common Variables**: Defines paths for essential resources and shared structures.

### 🗂️ **Structure**

This module includes a `global.envConf` object with the following properties:

- **`frontend`**:
    - `url`: The base URL for the frontend application.
- **`backend`**:
    - `apiUrl`: The URL for the REST API.
    - `gqlUrl`: The URL for the GraphQL API.
    - **`headers`**:
        - `api`: Default headers for REST API requests.
        - `gql`: Default headers for GraphQL requests.

### 🔑 **Environment Variables**

The following environment variables are available:

- **`E2E`**: Specifies the current environment (e.g., `int`, `staging`, `production`).
- **`GQL_TOKEN`**: Optional token for GraphQL authorization.

### 🗂️ **Common Variables**

- **`FILE_PATH`**: A reference path for common resources or files shared throughout the application.

### 🔧 **Global Utilities**

Several utility modules are globally available, such as:

- `global.TestData`: Contains common test data.
- `global.AssertiveStrings`: Text data for UI validation.
- `global.ApiHelper`: Utility for handling API requests.
- `global.GraphqlHelper`: Utility for managing GraphQL requests.
- `global.JsonHelper`: Utility for working with JSON.
- `global.PlaywrightActions`: Utility for Playwright-related actions.
- `global.BrowserStorageHelper`: Utility for managing browser storage.
- `global.CommonFunctions`: Shared functions across tests.
- `global.AccessibilityHelper`: Utility for conducting accessibility tests across applications.

### 📋 **Logging**

- **`global.verbose`**: A boolean that enables detailed verbose logging during execution.

---

### 📝 **Usage**

Accessing global configurations and utilities is easy throughout your application:

```javascript
// Accessing the frontend URL
console.log('Frontend URL:', envConf.frontend.url);

// Accessing the backend API URL
console.log('Backend API URL:', envConf.backend.apiUrl);

// Using a helper function
ApiHelper.someFunction();
```

---

## ⚡ **Quick Start Guide**

To get started, follow these simple steps:

1. **Clone the repository**:
   ```bash
   git clone https://your-repository-url.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set the environment variables**:
   Set the required environment variables (e.g., `E2E` for environment, `GQL_TOKEN` for GraphQL access).

4. **Run your application**:
   ```bash
   npm run start
   ```

---

## 💡 **Tips for Configuration**

- **Environment Switching**: If you need to switch between different environments, just update the `E2E` environment
  variable. For instance:
  ```bash
  export E2E=staging
  ```

- **Custom Headers**: For custom API integrations, modify the headers within `global.conf.js` under the `headers`
  section.

- **Verbose Logging**: To get more detailed logs, enable `global.verbose` and check your console for additional insights
  into the application’s behavior.

---

## 👤 **Author**

**Hexdee606**  
*Date: November 10, 2024*

---

## ⚠️ **Notes**

- Make sure to define all necessary environment variables before running the application to avoid any
  configuration-related errors.
- Update the `headers` section in `global.conf.js` based on the specifics of your API integrations (e.g., adding
  authorization tokens).