# JSON Data Filter

The `DataFilter` class offers utility methods for filtering JSON objects based on specific criteria. It supports
filtering based on conditions such as inclusion, exclusion, and comparisons, making it highly versatile for processing
complex data structures. The class allows for chaining configurations and returns only the specified keys from the
filtered results.

## Author

**Hexdee606**

## Date

**2024-11-10**

---

## Class Overview

The `DataFilter` class simplifies filtering and extracting specific data from JSON objects. It enables you to specify
which keys to return and apply filtering conditions such as exact matches, greater-than comparisons, and string
contains. The class is flexible and supports chaining configuration for building complex filtering logic.

---

### Visual Workflow of DataFilter

Here is a flowchart that illustrates the key operations of the `DataFilter` class:

```plaintext
+---------------------------+
|        DataFilter         |
+---------------------------+
            |
            v
+---------------------------+               +---------------------------+
|    Configure Filter       |   ----------> |    Apply Criteria         |
|  - Define Keys to Return  |               |  - Add Criteria to Filter |
|  - Define Filtering Rules |               +---------------------------+
+---------------------------+
            |
            v
+---------------------------+
|   Filter the Data         |
|   - Apply Criteria        |
|   - Return Filtered Data  |
+---------------------------+
```

This flowchart shows how data is first configured with keys to return and criteria, and then filtered accordingly,
resulting in a simplified data output.

---

## Class Methods

### `constructor()`

Initializes a new instance of the `DataFilter` class. The constructor prepares the instance for use, with no initial
configuration.

---

### `configure({keysToReturn, criteria = []})`

Configures the filter with keys to return and criteria for filtering.

**Parameters:**

- `config` (Object): Configuration object containing:
    - `keysToReturn` (Array<string>): The keys to extract from the data.
    - `criteria` (Array<Object>): Array of criteria objects for filtering the data.

**Returns:**

- `DataFilter`: The current instance for chaining.

**Usage Example:**

```javascript
dataFilter.configure({
    keysToReturn: ['user.name', 'user.age'],
    criteria: [{condition: FilterConditions.EXACTLY, key: 'user.age', value: 30}]
});
```

---

### `addCriteria(condition, key, value)`

Adds additional criteria for filtering data.

**Parameters:**

- `condition` (string): A condition type from `FilterConditions`.
- `key` (string): The key to filter on.
- `value` (any): The value to filter for.

**Returns:**

- `DataFilter`: The current instance for chaining.

**Usage Example:**

```javascript
dataFilter.addCriteria(FilterConditions.GREATER_THAN, 'user.age', 25);
```

---

### `filter(data)`

Filters the provided data based on the set criteria and returns only the specified keys.

**Parameters:**

- `data` (Array<Object>): The array of JSON objects to filter.

**Returns:**

- `Promise<Array<Object>>`: A promise that resolves to an array of filtered objects with the specified keys.

**Usage Example:**

```javascript
const filteredData = await dataFilter.filter(jsonData);
console.log(filteredData);
```

---

### Enum-like Object: `FilterConditions`

`FilterConditions` provides constants for various filtering conditions, which help define how the data should be
filtered.

- `CONTAINS`: Check if the value contains a specific substring.
- `EXACTLY`: Check if the value matches exactly.
- `EXCLUDE`: Check if the value does not match.
- `INCLUDE`: Check if the key exists in the object.
- `GREATER_THAN`: Check if the value is greater than the specified value.
- `LESS_THAN`: Check if the value is less than the specified value.
- `RANGE`: Check if the value is within a specified range.

---

## Example Usage

```javascript
const jsonData = [
    {
        "user": {
            "name": "Alice",
            "age": 25,
            "details": {
                "city": "New York",
                "address": {
                    "zip": "10001"
                }
            }
        }
    },
    {
        "user": {
            "name": "Bob",
            "age": 30,
            "details": {
                "city": "Los Angeles",
                "address": {
                    "zip": "90001"
                }
            }
        }
    }
];

// Create DataFilter instance and configure it
const dataFilter = new DataFilter();
dataFilter.configure({
    keysToReturn: [
        "user.name",
        "user.details.city",
        "user.details.address.zip",
        "user.age"
    ],
    criteria: [
        {condition: FilterConditions.CONTAINS, key: "user.details.city", value: "New York"},
        {condition: FilterConditions.EXCLUDE, key: "user.name", value: "Bob"},
        {condition: FilterConditions.GREATER_THAN, key: "user.age", value: 25}
    ]
});

// Perform filtering
dataFilter.filter(jsonData)
    .then(filteredData => {
        console.log("Filtered Data:", JSON.stringify(filteredData, null, 2));
    })
    .catch(error => {
        console.error("Error:", error);
    });
```

### Expected Output:

```json
[
  {
    "user": {
      "name": "Alice",
      "details": {
        "city": "New York",
        "address": {
          "zip": "10001"
        }
      },
      "age": 25
    }
  }
]
```

In this example, the data is filtered to include only Alice (whose city is "New York" and age is greater than 25) and
excludes Bob.

---

## Conclusion

The `DataFilter` class provides a powerful and flexible tool for filtering JSON data based on a variety of conditions.
Its ability to chain configuration and specify which keys to return makes it a valuable tool for handling and processing
complex datasets in a clean and efficient manner.