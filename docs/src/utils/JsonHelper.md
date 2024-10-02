# JSON Data Filter

The `DataFilter` class provides utility methods for filtering JSON objects based on specified criteria. It supports various filtering conditions, including inclusion, exclusion, and comparisons. The class allows for chaining configuration and returns only the specified keys from the filtered results.

## Author
Hexdee606

## Date
2024-09-22

## Class Overview

### Class Methods

#### `constructor()`
Initializes a new instance of the `DataFilter` class.

---

#### `configure({keysToReturn, criteria = []})`
Configures the filter with keys to return and criteria for filtering.

**Parameters:**
- `config` (Object): Configuration object.
  - `keysToReturn` (Array<string>): The keys to extract from the data.
  - `criteria` (Array<Object>): Array of criteria objects.

**Returns:**
- `DataFilter`: The current instance for chaining.

**Usage:**
```javascript
dataFilter.configure({
    keysToReturn: ['user.name', 'user.age'],
    criteria: [{condition: FilterConditions.EXACTLY, key: 'user.age', value: 30}]
});
```

---

#### `addCriteria(condition, key, value)`
Adds criteria for filtering data.

**Parameters:**
- `condition` (string): The condition type from `FilterConditions`.
- `key` (string): The key to filter on.
- `value` (any): The value to filter for.

**Returns:**
- `DataFilter`: The current instance for chaining.

**Usage:**
```javascript
dataFilter.addCriteria(FilterConditions.GREATER_THAN, 'user.age', 25);
```

---

#### `filter(data)`
Filters the provided data based on the set criteria and returns the specified keys.

**Parameters:**
- `data` (Array<Object>): The array of JSON objects to filter.

**Returns:**
- `Promise<Array<Object>>`: A promise that resolves to an array of filtered objects with the specified keys.

**Usage:**
```javascript
const filteredData = await dataFilter.filter(jsonData);
```

---

### Enum-like Object: `FilterConditions`

Provides constants for filtering conditions:

- `CONTAINS`: Check if the value contains a specific substring.
- `EXACTLY`: Check if the value matches exactly.
- `EXCLUDE`: Check if the value does not match.
- `INCLUDE`: Check if the key exists.
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

dataFilter.filter(jsonData)
    .then(filteredData => {
        console.log("Filtered Data:", JSON.stringify(filteredData, null, 2));
    })
    .catch(error => {
        console.error("Error:", error);
    });
```

## Conclusion

The `DataFilter` class provides a powerful and flexible way to filter JSON data based on specific criteria, allowing developers to focus on the relevant information while working with complex datasets.