# GraphQL Helper

The `GraphqlHelper` class provides methods to facilitate sending GraphQL queries using Playwright's request context. It
allows for configuration of request settings such as timeout and retry options, making it easy to interact with GraphQL
APIs in Playwright tests.

## Author

**Hexdee606**

## Date

**2024-11-10**

---

## Class Overview

The `GraphqlHelper` class is designed to simplify sending GraphQL queries and mutations within Playwright, providing
configurable request options such as timeouts, retries, and headers.

---

### Visual Representation of GraphQL Helper Workflow

Below is a flowchart depicting the core functions of the `GraphqlHelper` class:

```plaintext
+------------------------------+
|      GraphQL Query Helper    |
+------------------------------+
               |
  +------------+-------------+
  |                          |
  v                          v
+-------------------+   +--------------------+
|  Send Request     |   |  Configure Settings|
|  - GraphQL Query  |   |  - Timeout         |
|  - Variables      |   |  - Retries         |
|  - Headers        |   |  - HTTPS Errors    |
+-------------------+   +--------------------+
```

The flowchart illustrates the main functionalities of the `GraphqlHelper`, including sending requests and configuring
the settings for each request.

---

## Class Methods

### `constructor()`

Initializes the `GraphqlHelper` instance with default configuration settings.

**Default Configuration:**

- `timeout`: 60 seconds
- `maxRetries`: 3
- `ignoreHTTPSErrors`: true

---

### `defineConf({timeout, maxRetries, ignoreHTTPSErrors})`

Configure request settings for GraphQL requests.

**Parameters:**

- `options` (Object): Configuration options.
    - `timeout` (number, optional): Timeout in milliseconds.
    - `maxRetries` (number, optional): Maximum number of retries.
    - `ignoreHTTPSErrors` (boolean, optional): Whether to ignore HTTPS errors.

**Usage:**

```javascript
await graphqlHelper.defineConf({timeout: 30000, maxRetries: 5});
```

---

### `verboseLog(url, options, response)`

Logs debug information if verbose mode is enabled.

**Parameters:**

- `url` (string): The URL for the GraphQL request.
- `options` (Object): The options passed to the request.
- `response` (Object): The response received from the server.

**Usage:**

```javascript
await graphqlHelper.verboseLog('https://example.com/graphql', options, response);
```

---

### `sendRequest(query, variables = {}, headers = {})`

Sends a GraphQL query or mutation.

**Parameters:**

- `query` (string): The GraphQL query/mutation string.
- `variables` (Object, optional): The variables to send with the query.
- `headers` (Object, optional): Additional headers for the request.

**Returns:**

- `Promise<Object>`: The response from the GraphQL server.

**Throws:**

- `Error` if the request fails.

**Usage:**

```javascript
const response = await graphqlHelper.sendRequest(`
  query GetUser($id: ID!) {
    user(id: $id) {
      name
      email
    }
  }
`, {id: '12345'});

console.log(response);
```

---

## Error Handling

Errors are logged to the console, and exceptions are thrown to indicate failures in sending GraphQL queries.

---

## Environment Configuration

Before using the `GraphqlHelper` class, ensure that the environment variable `backend.gqlUrl` is set to the URL of your
GraphQL server. If this variable is not set, an error will be thrown during the initialization of the class.

---

## Conclusion

The `GraphqlHelper` class simplifies sending GraphQL queries and mutations within Playwright. With support for
configurable timeouts, retries, and logging, it makes interacting with GraphQL APIs easy and efficient for testing and
automation.