# BrowserStorageHelper

The `BrowserStorageHelper` class provides methods for managing browser storage (local and session) using Playwright. It
allows for the retrieval of keys and values from local storage and session storage, even within iframes.

## Author

**Hexdee606**

## Date

**2024-11-10**

## Class Overview

### Visual Overview of Storage Management Flow

Below is a flowchart showing how the `BrowserStorageHelper` interacts with the page's local storage and session storage:

```plaintext
+------------------------+
|   User Request         |
+------------------------+
        |
        v
+------------------------+   Retrieve Storage Data     +---------------------+
|   BrowserStorageHelper +---------------------------> | LocalStorage /      |
|                        |   (Get keys and values)     | SessionStorage      |
+------------------------+                             +---------------------+
        |
        v
+------------------------+      Access Iframe Storage?    
|   Switch to iframe?    |-----------------------------+
+------------------------+
        |
        v
+------------------------+       Return Storage Data 
|   Return JSON Data     |<----------------------------+
+------------------------+
```

This flowchart illustrates the core functionality of the `BrowserStorageHelper`, from the user's request to access
storage data, including iframe handling.

---

### Class Methods

#### `getLocalStorageKeysAndValues(page, partialUrl = "")`

Retrieves all keys and their values from local storage and returns them as a JSON object.

**Parameters:**

- `page` (Page): The Playwright page object.
- `partialUrl` (string, optional): A partial URL to identify the correct iframe (default: empty string).

**Returns:**

- `Promise<Object>`: A promise that resolves to a JSON object containing local storage keys and their values.

**Throws:**

- `Error` if the frame cannot be switched or evaluated.

**Usage:**

```javascript
const localStorageData = await browserStorageHelper.getLocalStorageKeysAndValues(page, "partial-url");
console.log(localStorageData);
```

---

#### `getSessionStorageKeysAndValues(page, partialUrl = "")`

Retrieves all keys and their values from session storage and returns them as a JSON object.

**Parameters:**

- `page` (Page): The Playwright page object.
- `partialUrl` (string, optional): A partial URL to identify the correct iframe (default: empty string).

**Returns:**

- `Promise<Object>`: A promise that resolves to a JSON object containing session storage keys and their values.

**Throws:**

- `Error` if the frame cannot be switched or evaluated.

**Usage:**

```javascript
const sessionStorageData = await browserStorageHelper.getSessionStorageKeysAndValues(page, "partial-url");
console.log(sessionStorageData);
```

---

#### `_getFrame(page, partialUrl)`

Switches to the iframe that contains the given partial URL. If not found, returns the main page.

**Parameters:**

- `page` (Page): The Playwright page object.
- `partialUrl` (string): A unique part of the URL of the iframe to switch to.

**Returns:**

- `Promise<Frame|Page>`: A promise that resolves to the Playwright frame object if found, otherwise the main page.

**Usage:**
This method is used internally to locate the correct iframe before accessing local or session storage.

---

#### `_parseLocalStorageValue(value)`

Parses a local storage value, attempting to convert it to JSON.

**Parameters:**

- `value` (string): The value to parse.

**Returns:**

- The parsed value or the original string if parsing fails.

**Usage:**
This method is used internally when retrieving local storage values.

---

#### `_parseSessionStorageValue(value)`

Parses a session storage value, attempting to convert it to JSON.

**Parameters:**

- `value` (string): The value to parse.

**Returns:**

- The parsed value or the original string if parsing fails.

**Usage:**
This method is used internally and reuses the parsing logic from `_parseLocalStorageValue`.

---

#### `switchFrameByPartialUrl(page, partialUrl)`

Switches to the iframe that contains the given partial URL. If not found, returns the main page.

**Parameters:**

- `page` (Page): The Playwright page object.
- `partialUrl` (string): A unique part of the URL of the iframe to switch to.

**Returns:**

- `Promise<Frame|Page>`: A promise that resolves to the Playwright frame object if found, otherwise the main page.

**Usage:**

```javascript
const frame = await browserStorageHelper.switchFrameByPartialUrl(page, "partial-url");
```

---

### Storage Methods Overview

Here is a simple visual representation of the different storage options available and their respective storage types:

```plaintext
+---------------------------------------------+
|   Local Storage                             |
| - Stores data for the duration              |
|   of the browser session                    |
| - Data persists even when page reloads      |
+---------------------------------------------+

+---------------------------------------------+
|   Session Storage                           |
| - Stores data for the duration              |
|   of the page session                       |
| - Data is cleared when the page is reloaded |
+---------------------------------------------+
```

---

## Conclusion

The `BrowserStorageHelper` class simplifies the management of browser storage in Playwright tests. It provides
convenient methods to access local and session storage, including support for navigating iframes, making it easier to
work with web applications that utilize these storage mechanisms.

**Use this class to streamline your browser storage interactions and easily manage data across different frames.**