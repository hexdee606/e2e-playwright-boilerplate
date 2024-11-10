# PlaywrightActions

## Table of Contents

1. [Overview](#overview)
2. [Class Structure](#class-structure)
    1. [Constructor](#constructor)
    2. [Methods](#methods)
        - [Frame Management](#frame-management)
        - [Element Interaction](#element-interaction)
        - [UI Component Interaction](#ui-component-interaction)
        - [Keyboard Interaction](#keyboard-interaction)
        - [Scrolling, Uploading, and Downloading](#scrolling-uploading-and-downloading)
3. [Usage Example](#usage-example)
4. [Conclusion](#conclusion)

---

## Overview:

The `PlaywrightActions` class provides a collection of utility methods designed to simplify automation tasks in
Playwright tests. It allows easy interaction with UI components, frames, elements, and even handles common keyboard and
file operations.

### Author

**Hexdee606**  
Date: *2024-11-10*

---

## Class Structure:

### Constructor

```javascript
constructor(verbose = false)
```

- **verbose** (boolean) – Enables verbose logging for debugging and detailed output.

---

## Methods

### Frame Management:

These methods help manage frames in a Playwright page context. You can switch between frames, retrieve the current
frame, and check if a frame is set.

| Method                     | Description                                             |
|----------------------------|---------------------------------------------------------|
| `getCurrentFrameStatus()`  | Retrieves the current frame status.                     |
| `switchTo(page, selector)` | Switches to a specified frame using a selector.         |
| `switchFrame(page)`        | Switches to the current frame or returns the main page. |

#### Example:

```javascript
const frameStatus = await playwrightActions.getCurrentFrameStatus(page);
console.log(frameStatus.setFramePath); // Outputs current frame path
```

---

### Element Interaction:

These methods allow interaction with various elements on the page like buttons, checkboxes, radio buttons, text inputs,
etc.

| Method                                               | Description                                           |
|------------------------------------------------------|-------------------------------------------------------|
| `waitAndClick(page, selector)`                       | Waits for an element to become visible and clicks it. |
| `checkCheckbox(page, selector)`                      | Checks a checkbox element.                            |
| `uncheckCheckbox(page, selector)`                    | Unchecks a checkbox element.                          |
| `selectRadioButton(page, selector)`                  | Selects a radio button.                               |
| `waitAndFillField(page, selector, text)`             | Fills in a text input.                                |
| `waitAndFillFieldSequentially(page, selector, text)` | Fills a text input sequentially.                      |
| `clearText(page, selector)`                          | Clears the text from a text input.                    |
| `getTextFromLocator(page, selector)`                 | Retrieves text from a specified locator.              |
| `getTextFromAttribute(page, selector, attribute)`    | Gets the value of an attribute from an element.       |
| `validateElementIsEnabled(page, selector)`           | Checks if an element is enabled.                      |
| `validateElementIsDisabled(page, selector)`          | Checks if an element is disabled.                     |
| `validateIsSelected(page, selector)`                 | Checks if a checkbox or radio button is selected.     |

#### Example:

```javascript
await playwrightActions.waitAndClick(page, 'button#submit');
await playwrightActions.checkCheckbox(page, 'input#accept');
```

---

### UI Component Interaction:

This section covers UI component-related methods, including handling dropdowns, alerts, and mouse hover actions.

| Method                                                         | Description                             |
|----------------------------------------------------------------|-----------------------------------------|
| `selectDropdownOption(page, dropdownSelector, optionSelector)` | Selects an option from a dropdown menu. |
| `acceptAlert(page)`                                            | Accepts a JavaScript alert dialog.      |
| `dismissAlert(page)`                                           | Dismisses a JavaScript alert dialog.    |
| `waitAndSee(page, selector)`                                   | Waits for an element to be visible.     |
| `mouseHover(page, selector)`                                   | Performs a hover action on an element.  |

#### Example:

```javascript
await playwrightActions.selectDropdownOption(page, 'select#options', 'option#1');
await playwrightActions.acceptAlert(page);
```

---

### Keyboard Interaction:

These methods simulate keyboard actions like pressing and holding keys.

| Method                  | Description                 |
|-------------------------|-----------------------------|
| `pressKey(page, key)`   | Presses a specified key.    |
| `holdKey(page, key)`    | Holds down a specified key. |
| `releaseKey(page, key)` | Releases a specified key.   |

#### Example:

```javascript
await playwrightActions.pressKey(page, 'Enter');
await playwrightActions.holdKey(page, 'Shift');
await playwrightActions.releaseKey(page, 'Shift');
```

---

### Scrolling, Uploading, and Downloading:

These methods help with scrolling, file uploads, and handling file downloads.

| Method                                       | Description                                |
|----------------------------------------------|--------------------------------------------|
| `scrollToElement(page, selector)`            | Scrolls to make an element visible.        |
| `uploadFile(page, selector, filePath)`       | Uploads a file using a file input.         |
| `downloadFile(page, selector, downloadPath)` | Downloads a file by triggering a download. |

#### Example:

```javascript
await playwrightActions.scrollToElement(page, 'div#content');
await playwrightActions.uploadFile(page, 'input[type="file"]', '/path/to/file.png');
```

---

## Usage Example:

Here’s how you might use `PlaywrightActions` in a real test scenario.

```javascript
const {chromium} = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto('https://example.com');

    // Click a button after waiting for it to be visible
    await playwrightActions.waitAndClick(page, 'button#submit');

    // Check a checkbox
    await playwrightActions.checkCheckbox(page, 'input#accept');

    await browser.close();
})();
```

---

## Conclusion:

The `PlaywrightActions` class simplifies Playwright test automation by providing easy-to-use methods for interacting
with frames, elements, and UI components. These utilities help make your test code more readable, maintainable, and
efficient.