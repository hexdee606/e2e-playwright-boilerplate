# CommonFunctions

The `CommonFunctions` class provides a collection of utility functions for various common operations, including directory management, string manipulation, date formatting, and Excel file handling.

## Author
Hexdee606

## Date
2024-09-29

## Class Overview

### Class Methods

#### `rmdir(dir)`
Recursively deletes a directory and its contents.

**Parameters:**
- `dir` (string): The directory to delete.

**Usage:**
```javascript
await commonFunctions.rmdir('path/to/directory');
```

---

#### `replaceAll(str, term, replacement)`
Replaces all occurrences of a term in a string with a replacement.

**Parameters:**
- `str` (string): The original string.
- `term` (string): The term to replace.
- `replacement` (string): The replacement term.

**Returns:**
- `string`: The modified string.

**Usage:**
```javascript
const modifiedString = await commonFunctions.replaceAll('Hello World', 'World', 'JavaScript');
console.log(modifiedString); // Output: Hello JavaScript
```

---

#### `verifyAssertiveTextWithArray(page, inputs, sec = 10)`
Verifies the presence of text from an object array in the UI.

**Parameters:**
- `page` (Page): The Playwright page object.
- `inputs` (Object): The object containing text to verify.
- `sec` (number, optional): The number of seconds to wait (default: 10 sec).

**Throws:**
- `Error` if the text is not found.

**Usage:**
```javascript
await commonFunctions.verifyAssertiveTextWithArray(page, {message: 'Hello'}, 10);
```

---

#### `getDateFromEpoch(epochDateAndTime)`
Converts an epoch date to a locale date string.

**Parameters:**
- `epochDateAndTime` (number): The epoch date and time.

**Returns:**
- `string`: The formatted date string.

**Usage:**
```javascript
const dateString = await commonFunctions.getDateFromEpoch(1633072800000);
console.log(dateString); // Output: 1/10/2021 (format may vary)
```

---

#### `roundOfDecimal(value, decimal)`
Rounds a number to a specified number of decimal places and formats it.

**Parameters:**
- `value` (number): The number to round.
- `decimal` (number): The number of decimal places.

**Returns:**
- `string`: The formatted number.

**Usage:**
```javascript
const formattedNumber = await commonFunctions.roundOfDecimal(123.4567, 2);
console.log(formattedNumber); // Output: 123.46
```

---

#### `verifyValueIsInBetween(value, min, max)`
Verifies if a value is between a minimum and maximum range.

**Parameters:**
- `value` (number): The value to check.
- `min` (number): The minimum value.
- `max` (number): The maximum value.

**Returns:**
- `boolean`: True if the value is within the range, false otherwise.

**Throws:**
- `Error` if the value is out of range.

**Usage:**
```javascript
const isInRange = await commonFunctions.verifyValueIsInBetween(10, 5, 15);
console.log(isInRange); // Output: true
```

---

#### `findMinAndMaxValue(value, percentage)`
Finds the minimum and maximum values based on a budget and percentage.

**Parameters:**
- `value` (number): The number.
- `percentage` (number): The percentage to calculate the range.

**Returns:**
- `Object`: The minimum and maximum values.

**Usage:**
```javascript
const {min, max} = await commonFunctions.findMinAndMaxValue(100, 20);
console.log(min, max); // Output: 80, 120
```

---

#### `charWrapWithEllipsis(string, len, includeEllipsis = false)`
Wraps a string to a specified length, optionally including an ellipsis.

**Parameters:**
- `string` (string): The string to wrap.
- `len` (number): The length to wrap to.
- `includeEllipsis` (boolean, optional): Whether to include an ellipsis (default: false).

**Returns:**
- `string`: The wrapped string.

**Usage:**
```javascript
const wrappedString = await commonFunctions.charWrapWithEllipsis('Hello World', 5, true);
console.log(wrappedString); // Output: Hello...
```

---

#### `transformTable(table)`
Transforms a Gherkin table into an array of objects.

**Parameters:**
- `table` (Object): The Gherkin table object containing `rawTable` (array of arrays).

**Returns:**
- `Array<Object>`: An array of objects where each object represents a row from the table.

**Usage:**
```javascript
const tableData = await commonFunctions.transformTable(gherkinTable);
console.log(tableData); // Output: [{ header1: 'value1', header2: 'value2' }, ...]
```

---

#### `roundToNearestTenthOrInt(num)`
Rounds a number to the nearest integer or to one decimal place if zero.

**Parameters:**
- `num` (number): The number to round.

**Returns:**
- `string`: The rounded value as a string.

**Usage:**
```javascript
const roundedValue = await commonFunctions.roundToNearestTenthOrInt(2.5);
console.log(roundedValue); // Output: 3
```

---

#### `capitalizeFirstWord(str)`
Capitalizes the first letter of a string.

**Parameters:**
- `str` (string): The input string.

**Returns:**
- `Promise<string>`: The modified string.

**Usage:**
```javascript
const capitalizedString = await commonFunctions.capitalizeFirstWord('hello world');
console.log(capitalizedString); // Output: Hello world
```

---

#### `readExcel(filePath, workSheetIndexOrName)`
Reads an Excel file and returns its contents as a JSON object.

**Parameters:**
- `filePath` (string): The path to the Excel file.
- `workSheetIndexOrName` (number|string): The index or name of the worksheet to read.

**Returns:**
- `Promise<Object[]>`: The JSON object representation of the worksheet data.

**Throws:**
- `Error` if the worksheet is not found or if the worksheet is empty.

**Usage:**
```javascript
const data = await commonFunctions.readExcel('path/to/file.xlsx', 'Sheet1');
console.log(data); // Output: [{ header1: 'value1', header2: 'value2' }, ...]
```

## Conclusion
The `CommonFunctions` class provides a comprehensive set of utility methods that enhance the ease of performing common operations in JavaScript applications, particularly those involving Playwright for testing. These methods are designed to streamline processes such as directory management, data formatting, and Excel file handling.