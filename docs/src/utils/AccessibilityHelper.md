# AccessibilityHelper Class:

## Table of Contents

1. [Overview](#overview)
2. [Constructor](#constructor)
3. [Methods](#methods)
    - [Accessibility Check Methods](#accessibility-check-methods)
    - [WCAG Standards Methods](#wcag-standards-methods)
    - [Best Practices Check](#best-practices-check)
4. [Usage Example](#usage-example)
5. [Conclusion](#conclusion)

---

## Overview:

The `AccessibilityHelper` class provides a set of utilities to perform accessibility checks on your web pages. Using the
powerful [Axe-core](https://github.com/dequelabs/axe-core) integration, this class helps automate the process of
ensuring your application complies with various web accessibility standards such as WCAG 2.0, WCAG 2.1, and WCAG 2.2.

The main goal of this utility is to detect accessibility violations in your pages and provide actionable insights for
improvement.

### Author

**Hexdee606**  
Date: *2024-11-10*

---

## Constructor:

```javascript
constructor(verbose = false)
```

- **Parameters**:
    - `verbose` (boolean, optional): If set to `true`, debug-level logs will be printed for each action performed by the
      helper (default is `false`).

---

## Methods:

### Accessibility Check Methods

These methods allow you to check accessibility compliance on a page using Axe-core's standard rules.

| Method Name                             | Description                                                  |
|-----------------------------------------|--------------------------------------------------------------|
| `checkAccessibility(page, standards)`   | Checks the page's accessibility against specified standards. |
| `verboseLog(action, selector, message)` | Logs detailed debug information for accessibility actions.   |

#### Example Usage:

```javascript
const accessibilityHelper = require('./path/to/AccessibilityHelper');

await accessibilityHelper.checkAccessibility(page, ['wcag2a']); // Check against WCAG 2.0 Level A standards
```

### WCAG Standards Methods

These methods check for compliance against specific WCAG levels and versions.

| Method Name           | Description                                            |
|-----------------------|--------------------------------------------------------|
| `checkWCAG2A(page)`   | Checks accessibility for WCAG 2.0 Level A standards.   |
| `checkWCAG2AA(page)`  | Checks accessibility for WCAG 2.0 Level AA standards.  |
| `checkWCAG2AAA(page)` | Checks accessibility for WCAG 2.0 Level AAA standards. |
| `checkWCAG21A(page)`  | Checks accessibility for WCAG 2.1 Level A standards.   |
| `checkWCAG21AA(page)` | Checks accessibility for WCAG 2.1 Level AA standards.  |
| `checkWCAG22AA(page)` | Checks accessibility for WCAG 2.2 Level AA standards.  |

#### Example Usage:

```javascript
// Check WCAG 2.1 Level A
await accessibilityHelper.checkWCAG21A(page);

// Check WCAG 2.0 Level AA
await accessibilityHelper.checkWCAG2AA(page);
```

### Best Practices Check

This method checks against common accessibility best practices that don't fall strictly under any specific WCAG version
but are generally recommended for improving accessibility.

| Method Name                | Description                                     |
|----------------------------|-------------------------------------------------|
| `checkBestPractices(page)` | Checks for common accessibility best practices. |

#### Example Usage:

```javascript
// Check for common accessibility best practices
await accessibilityHelper.checkBestPractices(page);
```

---

## Usage Example:

Here is an example of how you might integrate the `AccessibilityHelper` class into your Playwright test suite to perform
an accessibility check on a webpage.

```javascript
const {chromium} = require('playwright');
const accessibilityHelper = require('./path/to/AccessibilityHelper');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Navigate to a web page
    await page.goto('https://example.com');

    // Perform an accessibility check for WCAG 2.0 Level AA standards
    try {
        await accessibilityHelper.checkWCAG2AA(page); // Check for WCAG 2.0 Level AA violations
        console.log('No accessibility violations found.');
    } catch (error) {
        console.error(error.message); // Handle violations if found
    }

    await browser.close();
})();
```

---

## Conclusion:

The `AccessibilityHelper` class provides a convenient way to automate accessibility testing in Playwright. By using
Axe-core, it ensures that your web pages comply with key accessibility standards, such as WCAG 2.0, 2.1, and 2.2, as
well as common best practices.

This utility is especially useful for integrating into automated test suites, ensuring accessibility issues are caught
early and consistently across your application.

### Future Improvements:

- **Customizable Standards**: Allow users to define their own accessibility rules or provide additional configurations.
- **Reporting**: Implementing more detailed reporting mechanisms (e.g., HTML/CSV reports) for violations found during
  the check.