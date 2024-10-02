# PlaywrightActions

## Overview

The `PlaywrightActions` class provides utility methods for interacting with frames and elements within a Playwright test context. It includes methods for switching frames, interacting with UI components, and performing common actions.

### Author
Hexdee606 
Date: 2024-09-22

## Class Structure

### Constructor

```javascript
constructor(verbose = false)
```
- **Parameters**:
    - `verbose` (boolean): Enables verbose logging.

### Methods

#### Frame Management

- **`getCurrentFrameStatus()`**
    - **Purpose**: Retrieves the current frame status.
    - **Returns**: An object containing:
        - `setFramePath` (string): The path of the current frame.
        - `setFrame` (boolean): Indicates if a frame is set.

- **`switchTo(page, selector)`**
    - **Purpose**: Switches the context to a specified frame using a selector.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
        - `selector` (string): The selector for the frame element.
    - **Returns**: `Promise<void>`

- **`switchFrame(page)`**
    - **Purpose**: Retrieves the current frame or returns the main page if no frame is set.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
    - **Returns**: `Promise<Page>`

#### Element Interaction

- **`waitAndClick(page, selector)`**
    - **Purpose**: Waits for an element to be visible and clicks it.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
        - `selector` (string): The selector for the element to click.
    - **Returns**: `Promise<void>`

- **`checkCheckbox(page, selector)`**
    - **Purpose**: Checks a checkbox element.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
        - `selector` (string): The selector for the checkbox.
    - **Returns**: `Promise<void>`

- **`uncheckCheckbox(page, selector)`**
    - **Purpose**: Unchecks a checkbox element.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
        - `selector` (string): The selector for the checkbox.
    - **Returns**: `Promise<void>`

- **`selectRadioButton(page, selector)`**
    - **Purpose**: Selects a radio button element.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
        - `selector` (string): The selector for the radio button.
    - **Returns**: `Promise<void>`

- **`waitAndFillField(page, selector, text)`**
    - **Purpose**: Fills a text input element.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
        - `selector` (string): The selector for the text input.
        - `text` (string): The text to fill in.
    - **Returns**: `Promise<void>`

- **`waitAndFillFieldSequentially(page, selector, text)`**
    - **Purpose**: Fills a text input element sequentially.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
        - `selector` (string): The selector for the text input.
        - `text` (string): The text to fill in.
    - **Returns**: `Promise<void>`

- **`clearText(page, selector)`**
    - **Purpose**: Clears the text in a text input element.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
        - `selector` (string): The selector for the text input.
    - **Returns**: `Promise<void>`

- **`getTextFromLocator(page, selector)`**
    - **Purpose**: Retrieves text content from a specified locator.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
        - `selector` (string): The selector for the element.
    - **Returns**: `Promise<string>` - The text content of the element.

- **`getTextFromAttribute(page, selector, attribute)`**
    - **Purpose**: Retrieves the value of a specified attribute from an element.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
        - `selector` (string): The selector for the element.
        - `attribute` (string): The attribute to retrieve.
    - **Returns**: `Promise<string>` - The value of the specified attribute.

- **`validateElementIsEnabled(page, selector)`**
    - **Purpose**: Validates if an element is enabled.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
        - `selector` (string): The selector for the element.
    - **Returns**: `Promise<void>`

- **`validateElementIsDisabled(page, selector)`**
    - **Purpose**: Validates if an element is disabled.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
        - `selector` (string): The selector for the element.
    - **Returns**: `Promise<void>`

- **`validateIsSelected(page, selector)`**
    - **Purpose**: Validates if a checkbox or radio button is selected.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
        - `selector` (string): The selector for the element.
    - **Returns**: `Promise<void>`

#### UI Component Interaction

- **`selectDropdownOption(page, dropdownSelector, optionSelector)`**
    - **Purpose**: Selects an option from a dropdown menu.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
        - `dropdownSelector` (string): The selector for the dropdown menu.
        - `optionSelector` (string): The selector for the option to select.
    - **Returns**: `Promise<void>`

- **`acceptAlert(page)`**
    - **Purpose**: Accepts a JavaScript alert dialog.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
    - **Returns**: `Promise<void>`

- **`dismissAlert(page)`**
    - **Purpose**: Dismisses a JavaScript alert dialog.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
    - **Returns**: `Promise<void>`

- **`waitAndSee(page, selector)`**
    - **Purpose**: Waits for an element to be visible.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
        - `selector` (string): The selector for the element.
    - **Returns**: `Promise<void>`

- **`mouseHover(page, selector)`**
    - **Purpose**: Waits for an element to be visible and then performs a hover action on it.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
        - `selector` (string): The selector for the element.
    - **Returns**: `Promise<void>`

- **`getCurrentUrl(page)`**
    - **Purpose**: Retrieves the current URL of the page.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
    - **Returns**: `Promise<string>` - The current URL of the page.

- **`waitAndVisible(page, selector)`**
    - **Purpose**: Waits for an element to be visible and returns a boolean indicating its visibility.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
        - `selector` (string): The selector for the element.
    - **Returns**: `Promise<boolean>` - `true` if the element is visible, `false` otherwise.

#### Keyboard Interaction

- **`pressKey(page, key)`**
    - **Purpose**: Presses a specified key.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
        - `key` (string): The key to press (e.g., 'Enter', 'Escape').
    - **Returns**: `Promise<void>`

- **`holdKey(page, key)`**
    - **Purpose**: Holds down a specified key.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
        - `key` (string): The key to hold down.
    - **Returns**: `Promise<void>`

- **`releaseKey(page, key)`**
    - **Purpose**: Releases a specified key.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
        - `key` (string): The key to release.
    - **Returns**: `Promise<void>`

#### Scrolling, Uploading, and Downloading

- **`scrollToElement(page, selector)`**
    - **Purpose**: Scrolls the page to make a specified element visible.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
        - `selector` (string): The selector for the element to scroll to.


- **Returns**: `Promise<void>`

- **`uploadFile(page, selector, filePath)`**
    - **Purpose**: Uploads a file or multiple files using a specified input element.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
        - `selector` (string): The selector for the file input element.
        - `filePath` (string|string[]): The path(s) to the file(s) to upload.
    - **Returns**: `Promise<void>`

- **`downloadFile(page, selector, downloadPath)`**
    - **Purpose**: Downloads a file by clicking the specified element and waiting for the download event.
    - **Parameters**:
        - `page` (Page): The Playwright Page object.
        - `selector` (string): The selector for the element that triggers the download.
        - `downloadPath` (string): The path where the file should be saved.
    - **Returns**: `Promise<void>`

## Usage Example

```javascript
const playwrightActions = require('./path/to/PlaywrightActions');

(async () => {
    const { chromium } = require('playwright');
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto('https://example.com');

    // Example of using PlaywrightActions
    await playwrightActions.waitAndClick(page, 'button#submit');
    await playwrightActions.checkCheckbox(page, 'input#checkbox');
    
    await browser.close();
})();
```

## Conclusion

The `PlaywrightActions` class provides a comprehensive set of methods for interacting with web elements in Playwright. It simplifies test automation by encapsulating common actions in reusable methods, ensuring cleaner and more maintainable test code.
