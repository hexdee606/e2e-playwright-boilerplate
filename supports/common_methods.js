const {expect} = require('@playwright/test');

class common_method {
    /**
     * Waits for an element to be visible and then clicks it.
     * @param {Page} page - The Playwright page object.
     * @param {string} selector - The CSS selector of the element to click.
     * @param {number} [timeout=10000] - The number of milliseconds to wait {default time 10 sec}.
     */
    async waitAndClick(page, selector, timeout = 10000) {
        const element = await page.waitForSelector(selector, {timeout});
        await element.click();
    }

    /**
     * Navigates to a specified URL, waits for an element to be visible, and then clicks it.
     * @param {Page} page - The Playwright page object.
     * @param {string} [url=""] - The URL to visit. Defaults to environment URL if empty.
     * @param {string} selector - The CSS selector of the element to click.
     * @param {number} [timeout=10000] - The number of milliseconds to wait for the element to be visible.
     */
    async waitToNavigate(page, url = "", selector, timeout = 10000) {
        await page.goto(url);
        await page.waitForSelector(selector, {timeout});
    }

    /**
     * Waits for an element to be visible and then checks it if it is not already checked.
     * @param {Page} page - The Playwright page object.
     * @param {string} selector - The CSS selector of the element to check.
     * @param {number} [timeout=10000] - The number of milliseconds to wait {default time 10 sec}.
     */
    async waitAndChecked(page, selector, timeout = 10000) {
        const element = await page.waitForSelector(selector, {timeout});
        const isChecked = await element.evaluate(el => el.checked);
        if (!isChecked) {
            await element.click();
        }
    }

    /**
     * Waits for an element to be visible and then unchecks it if it is checked.
     * @param {Page} page - The Playwright page object.
     * @param {string} selector - The CSS selector of the element to uncheck.
     * @param {number} [timeout=10000] - The number of milliseconds to wait {default time 10 sec}.
     */
    async waitAndUnchecked(page, selector, timeout = 10000) {
        const element = await page.waitForSelector(selector, {timeout});
        const isChecked = await element.evaluate(el => el.checked);
        if (isChecked) {
            await element.click();
        }
    }

    /**
     * Waits for an element to be visible and then verifies its presence.
     * @param {Page} page - The Playwright page object.
     * @param {string} selector - The CSS selector of the element to verify.
     * @param {number} [timeout=10000] - The number of milliseconds to wait {default time 10 sec}.
     */
    async waitAndSee(page, selector, timeout = 10000) {
        await page.waitForSelector(selector, {timeout});
        const element = await page.$(selector);
        if (!element) {
            throw new Error(`Element with selector "${selector}" is not visible.`);
        }
    }

    /**
     * Waits for an element to be visible and fills it with text.
     * @param {Page} page - The Playwright page object.
     * @param {string} selector - The CSS selector of the element to fill.
     * @param {string} text - The text to fill the element with.
     * @param {number} [timeout=10000] - The number of milliseconds to wait {default time 10 sec}.
     */
    async waitAndFillField(page, selector, text, timeout = 10000) {
        const element = await page.waitForSelector(selector, {timeout});
        await element.fill(text);
    }

    /**
     * Clears the contents of a field.
     * @param {Page} page - The Playwright page object.
     * @param {string} selector - The CSS selector of the field to clear.
     * @param {number} [timeout=10000] - The number of milliseconds to wait {default time 10 sec}.
     */
    async clearFields(page, selector, timeout = 10000) {
        const element = await page.waitForSelector(selector, {timeout});
        await element.click({clickCount: 3});
        await page.keyboard.press('Backspace');
    }

    /**
     * Waits for an element to be invisible and then asserts it is not visible.
     * @param {Page} page - The Playwright page object.
     * @param {string} selector - The CSS selector of the element.
     * @param {number} [timeout=10000] - The number of milliseconds to wait {default time 10 sec}.
     */
    async waitForInvisibleAndDontSee(page, selector, timeout = 10000) {
        await page.waitForSelector(selector, {state: 'hidden', timeout});
        const element = await page.$(selector);
        if (element) {
            throw new Error(`Element with selector "${selector}" is still visible.`);
        }
    }

    /**
     * Waits for an element to be visible and asserts its text.
     * @param {Page} page - The Playwright page object.
     * @param {string} text - The text to assert.
     * @param {string} selector - The CSS selector of the element.
     * @param {number} [timeout=10000] - The number of milliseconds to wait {default time 10 sec}.
     */
    async waitAndAssertText(page, text, selector, timeout = 10000) {
        const element = await page.waitForSelector(selector, {timeout});
        const elementText = await element.innerText();
        if (elementText !== text) {
            throw new Error(`Text "${text}" not found in element with selector "${selector}".`);
        }
    }

    /**
     * Waits for an element to be visible and retrieves its attribute value.
     * @param {Page} page - The Playwright page object.
     * @param {string} attribute - The attribute to retrieve.
     * @param {string} selector - The CSS selector of the element.
     * @param {number} [timeout=10000] - The number of milliseconds to wait {default time 10 sec}.
     * @returns {Promise<string>} The attribute value.
     */
    async waitAndGetTextFromAttribute(page, attribute, selector, timeout = 10000) {
        const element = await page.waitForSelector(selector, {timeout});
        return await element.getAttribute(attribute);
    }

    /**
     * Waits for an element to be visible and retrieves its text content.
     * @param {Page} page - The Playwright page object.
     * @param {string} selector - The CSS selector of the element.
     * @param {number} [timeout=10000] - The number of milliseconds to wait {default time 10 sec}.
     * @returns {Promise<string[]>} The text content of the element.
     */
    async waitAndGetTextFromLocator(page, selector, timeout = 10000) {
        const element = await page.waitForSelector(selector, {timeout});
        return await element.evaluate(el => [el.innerText]);
    }

    /**
     * Verifies that a button is enabled by checking its aria-disabled attribute.
     * @param {Page} page - The Playwright page object.
     * @param {string} selector - The CSS selector of the element.
     * @param {number} [timeout=10000] - The number of milliseconds to wait {default time 10 sec}.
     */
    async verifyIsEnabled(page, selector, timeout = 10000) {
        const element = await page.waitForSelector(selector, {timeout});
        const value = await element.getAttribute('aria-disabled');
        expect(value).toBe('false');
    }

    /**
     * Verifies that a button is disabled by checking its aria-disabled attribute.
     * @param {Page} page - The Playwright page object.
     * @param {string} selector - The CSS selector of the element.
     * @param {number} [timeout=10000] - The number of milliseconds to wait {default time 10 sec}.
     * @returns {Promise<string>} The aria-disabled attribute value.
     */
    async verifyIsDisabled(page, selector, timeout = 10000) {
        const element = await page.waitForSelector(selector, {timeout});
        const value = await element.getAttribute('aria-disabled');
        expect(value).toBe('true');
        return value;
    }

    /**
     * Verifies that a button is selected by checking its selected attribute.
     * @param {Page} page - The Playwright page object.
     * @param {string} selector - The CSS selector of the element.
     * @param {number} [timeout=10000] - The number of milliseconds to wait {default time 10 sec}.
     */
    async verifyIsSelected(page, selector, timeout = 10000) {
        const element = await page.waitForSelector(selector, {timeout});
        const value = await element.getAttribute('selected');
        expect(value).toBe('true');
    }
}

module.exports = new common_method();
