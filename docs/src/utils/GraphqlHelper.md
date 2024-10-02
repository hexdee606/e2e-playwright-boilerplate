# GraphQL Helper

The `GraphqlHelper` class provides methods to facilitate sending GraphQL queries using Playwright's request context. It allows for configuration of request settings such as timeout and retry options.

## Author
Hexdee606

## Date
2024-09-22

## Class Overview

### Class Methods

#### `constructor()`
Initializes the `GraphqlHelper` instance with default configuration settings.

**Default Configuration:**
- `timeout`: 60 seconds
- `maxRetries`: 3
- `ignoreHTTPSErrors`: true

---

#### `defineConf({timeout, maxRetries, ignoreHTTPSErrors})`
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

#### `verboseLog(url, options, response)`
Log debug information if verbose mode is enabled.

**Parameters:**
- `url` (string): The URL for the GraphQL request.
- `options` (Object): The options passed to the request.
- `response` (Object): The response received from the server.

**Usage:**
```javascript
await graphqlHelper.verboseLog('https://example.com/graphql', options, response);
```

---

#### `sendRequest(query, variables = {}, headers = {})`
Send a GraphQL query or mutation.

**Parameters:**
- `query` (string): The GraphQL query/mutation string.
- `variables` (Object, optional): The body to send with the request.
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

## Error Handling

Errors are logged to the console, and exceptions are thrown to indicate failures in sending GraphQL queries.

## Environment Configuration

Make sure to set the environment variable `backend.gqlUrl` to your GraphQL server's URL. If this variable is not set, an error will be thrown during the initialization of the class.

## Conclusion

The `GraphqlHelper` class simplifies the process of making GraphQL requests within Playwright, providing configurable options for timeouts, retries, and more. Use it to interact with GraphQL APIs efficiently in your testing and automation workflows.