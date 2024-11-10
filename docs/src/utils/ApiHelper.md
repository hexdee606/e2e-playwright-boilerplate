# ApiHelper

The `ApiHelper` class provides methods to facilitate sending API requests using Playwright's request context. This class
allows for configuration of request settings such as timeout and retry options, making it easier to manage API
interactions in your application.

## Author

**Hexdee606**

## Date

**2024-11-10**

## Class Overview

### Constructor

```javascript
constructor()
```

Initializes the `ApiHelper` with default configuration settings:

- `timeout`: 60 seconds
- `maxRetries`: 3
- `ignoreHTTPSErrors`: true

### Visual Overview of Request Flow

The following diagram illustrates how the `ApiHelper` works when sending an API request:

```plaintext
+-------------------+
|   User Request    |
+-------------------+
        |
        v
+-------------------+    Define Request Config
|   ApiHelper       |-------------------------------------------+
|                   |                                           |
| - timeout         |                                           |
| - retries         |                                           |
| - headers         |                                           |
| - body            |                                           |
+-------------------+                                           |
        |                                                       |
        v                                                       |
+-------------------+     Send API Request                      |
|   Playwright      | <-----------------------------------------+
|   Request Context |     (GET, POST, PUT, PATCH, DELETE)       |
+-------------------+
        |
        v
+-------------------+
|   API Response    |
+-------------------+
        |
        v
+-------------------+
|   Return Response |
+-------------------+
```

This flow shows how the request is processed through `ApiHelper` and then sent via Playwright's request context.

---

### Configuration Method

#### `defineConf(options)`

Configures request settings for API requests.

**Parameters:**

- `options` (Object): Configuration options.
    - `timeout` (number): Timeout in milliseconds (overrides default).
    - `maxRetries` (number): Maximum number of retries (overrides default).
    - `ignoreHTTPSErrors` (boolean): Whether to ignore HTTPS errors (overrides default).

**Usage:**

```javascript
const apiHelper = new ApiHelper();
await apiHelper.defineConf({timeout: 30000, maxRetries: 5});
```

---

### Logging Method

#### `verboseLog(url, options, response)`

Logs debug information if verbose mode is enabled.

**Parameters:**

- `url` (string): The URL for the API request.
- `options` (Object): The options passed to the request.
- `response` (Object): The response received from the server.

**Usage:**
This method is called automatically during the API request to log debug information.

---

### Request Methods

#### `sendRequest(endpoint, method, body = {}, headers = {})`

Sends a generic API request.

**Parameters:**

- `endpoint` (string): The endpoint for the API request.
- `method` (string): The HTTP method (GET, POST, PUT, PATCH, DELETE).
- `body` (Object): The body to send with the request (default: empty object).
- `headers` (Object): Additional headers for the request (default: empty object).

**Returns:**

- `Promise<Object>`: The response from the API server.

**Throws:**

- `Error` if the request fails.

**Usage:**

```javascript
const response = await apiHelper.sendRequest('/api/endpoint', 'GET');
```

#### Request Type Visual Representation

Here is a visual breakdown of the different HTTP methods supported by `ApiHelper`:

```plaintext
+-----------------------------+         +------------------------------+
|       GET Request           |         |        POST Request          |
|                             |         |                              |
| - Retrieve data             |         | - Send data to create/update |
| - Commonly used for reading |         | - Common for data submission |
|   resources                 |         |                              |
+-----------------------------+         +------------------------------+

+-----------------------------+         +------------------------------+
|       PUT Request           |         |        PATCH Request         |
|                             |         |                              |
| - Fully update resource     |         | - Partially update resource  |
| - Replaces existing data    |         | - Commonly used for partial  |
|                             |         |   updates                    |
+-----------------------------+         +------------------------------+

+-----------------------------+
|       DELETE Request        |
|                             |
| - Delete resource           |
| - Permanent removal         |
+-----------------------------+
```

---

#### `sendGetRequest(endpoint, body = {}, headers = {})`

Sends a GET request.

**Parameters:**

- `endpoint` (string): The endpoint for the API request.
- `body` (Object): The body to send with the request (default: empty object).
- `headers` (Object): Additional headers for the request (default: empty object).

**Returns:**

- `Promise<Object>`: The response from the API server.

**Throws:**

- `Error` if the request fails.

**Usage:**

```javascript
const response = await apiHelper.sendGetRequest('/api/endpoint');
```

---

#### `sendPostRequest(endpoint, body = {}, headers = {})`

Sends a POST request.

**Parameters:**

- `endpoint` (string): The endpoint for the API request.
- `body` (Object): The body to send with the request (default: empty object).
- `headers` (Object): Additional headers for the request (default: empty object).

**Returns:**

- `Promise<Object>`: The response from the API server.

**Throws:**

- `Error` if the request fails.

**Usage:**

```javascript
const response = await apiHelper.sendPostRequest('/api/endpoint', {key: 'value'});
```

---

### Conclusion

The `ApiHelper` class simplifies the process of making API requests with customizable settings and convenient methods
for different HTTP methods. Ensure to configure the environment properly for the API URL and any required headers.

**Use this class to streamline your API interactions, reduce boilerplate code, and handle requests efficiently.**

```