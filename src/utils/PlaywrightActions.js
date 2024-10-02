/**
 * Playwright Customised Actions
 *
 * This module defines the PlaywrightActions class, which provides utility methods
 * for interacting with frames and elements within a Playwright test context. It includes
 * methods for switching to frames, interacting with UI components, and performing common actions.
 *
 * Author: Hexdee606
 * Date: 2024-09-22
 */

import {expect, Page} from '@playwright/test';

class PlaywrightActions {

    constructor() {
        this.frame = null;
        this.setFramePath = "" // Holds the current frame xpath, if applicable
        this.setFrame = false; // Indicates whether a frame has been set
    }

    /**
     * Retrieves the current frame status, including the path and the frame setting.
     *
     * @returns {Object} An object containing the current frame status:
     *                  - {string} setFramePath - The path of the current frame.
     *                  - {Function} setFrame - A function to set the current frame.
     */
    getCurrentFrameStatus() {
        return { setFramePath: this.setFrame, setFrame: this.setFrame };
    }


    /**
     * Logs debug information if verbose mode is enabled.
     *
     * @param {string} action - The action being performed.
     * @param {string} selector - The selector associated with the action.
     * @param {string} message - Additional message for context.
     */
    async verboseLog(action, selector, message = '') {
        if (verbose) {
            const timestamp = new Date().toISOString(); // Get the current timestamp
            const formattedMessage = `[Playwright Action] - [${timestamp}] - [${action}] - [${selector}]${message ? ` - ${message}` : ''}`;
            console.debug(formattedMessage);
        }
    }

    /**
     * Switches the context to a specified frame using a selector.
     *
     * @param {Page} page - The Playwright Page object representing the current page.
     * @param {string} selector - The selector to locate the frame element.
     * @returns {Promise<void>}
     */
    async switchTo(page, selector) {
        await this.verboseLog('Switching to frame', selector, 'Attempting to switch frame context.');
        if (selector && selector.trim() !== '') {
            const frameElement = page.locator(selector);
            await frameElement.waitFor({state: 'attached'});
            this.setFrame = true;
            this.setFramePath = selector;
            this.frame = await page.frameLocator(selector);
            await this.verboseLog('Switched to frame', selector, 'Frame has been successfully located.');
        } else {
            this.setFrame = false;
            this.frame = page; // Reset to main page
            await this.verboseLog('Switch to frame', selector, 'No valid selector provided, defaulting to main page.');
        }
    }

    /**
     * Retrieves the current frame or returns the main page if no frame is set.
     *
     * @param {Page} page - The Playwright Page object representing the current page.
     * @returns {Promise<Page>} - Returns the frame locator if set, otherwise the main page.
     */
    async switchFrame(page) {
        const currentContext = this.setFrame ? 'iFrame' : 'Main Page';
        await this.verboseLog('Switching frame context', '', `Current context is: ${currentContext}`);
        const result = this.setFrame ? await page.frameLocator(this.setFramePath) : page;
        await this.verboseLog('Context switched', '', `Now using context: ${this.setFrame ? 'iFrame' : 'Main Page'}`);
        return result;
    }

    /**
     * Waits for an element to be visible and clicks it.
     *
     * @param {Page} page - The Playwright Page object representing the current page.
     * @param {string} selector - The selector for the element to wait for and click.
     * @returns {Promise<void>}
     */
    async waitAndClick(page, selector) {
        await this.verboseLog('Waiting for element to be visible', selector, 'Getting current frame or main page.');
        const frame = await this.switchFrame(page);
        const element = await frame.locator(selector);
        await element.waitFor({state: 'visible'});
        await this.verboseLog('Element visibility', selector, 'Element is now visible.');
        await element.click();
        await this.verboseLog('Clicked element', selector, 'Element has been clicked successfully.');
    }

    /**
     * Checks a checkbox element.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {string} selector - The selector for the checkbox to check.
     * @returns {Promise<void>}
     */
    async checkCheckbox(page, selector) {
        await this.verboseLog('Checking checkbox', selector, 'Attempting to check checkbox.');
        const frame = await this.switchFrame(page);
        await frame.locator(selector).setChecked(true);
        await expect(frame.locator(selector)).toBeChecked();
        await this.verboseLog('Checked checkbox', selector, 'Checkbox has been checked successfully.');
    }

    /**
     * Unchecks a checkbox element.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {string} selector - The selector for the checkbox to uncheck.
     * @returns {Promise<void>}
     */
    async uncheckCheckbox(page, selector) {
        await this.verboseLog('Unchecking checkbox', selector, 'Attempting to uncheck checkbox.');
        const frame = await this.switchFrame(page);
        const checkbox = await frame.locator(selector);
        await checkbox.waitFor({state: 'visible'});
        if (await checkbox.isChecked()) {
            await checkbox.setChecked(false);
            await expect(checkbox).not.toBeChecked();
            await this.verboseLog('Unchecked checkbox', selector, 'Checkbox has been unchecked successfully.');
        } else {
            await expect(checkbox).not.toBeChecked();
            await this.verboseLog('Checkbox already unchecked', selector);
        }
    }

    /**
     * Selects a radio button element.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {string} selector - The selector for the radio button to select.
     * @returns {Promise<void>}
     */
    async selectRadioButton(page, selector) {
        await this.verboseLog('Selecting radio button', selector, 'Attempting to select radio button.');
        const frame = await this.switchFrame(page);
        const radioButton = await frame.locator(selector);
        await radioButton.waitFor({state: 'visible'});
        await radioButton.setChecked(true);
        await this.verboseLog('Selected radio button', selector, 'Radio button has been selected successfully.');
    }

    /**
     * Fills a text input element.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {string} selector - The selector for the text input.
     * @param {string} text - The text to fill in the input.
     * @returns {Promise<void>}
     */
    async waitAndFillField(page, selector, text) {
        await this.verboseLog('Filling text', selector, `Attempting to fill text: "${text}".`);
        const frame = await this.switchFrame(page);
        const input = await frame.locator(selector);
        await input.waitFor({state: 'visible'});
        await input.fill(text);
        await this.verboseLog('Filled text', selector, `Filled text: "${text}"`);
    }

    /**
     * Fills a text input element sequentially.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {string} selector - The selector for the text input.
     * @param {string} text - The text to fill in the input.
     * @returns {Promise<void>}
     */
    async waitAndFillFieldSequentially(page, selector, text) {
        await this.verboseLog('Filling text', selector, `Attempting to fill text Sequentially: "${text}".`);
        const frame = await this.switchFrame(page);
        const input = await frame.locator(selector);
        await input.waitFor({state: 'visible'});
        await this.clearText(page, selector);
        await input.pressSequentially(text);
        await this.verboseLog('Filled text', selector, `Filled text Sequentially: "${text}"`);
    }

    /**
     * Clears the text in a text input element.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {string} selector - The selector for the text input.
     * @returns {Promise<void>}
     */
    async clearText(page, selector) {
        await this.verboseLog('Clearing text', selector, 'Attempting to clear text.');
        const frame = await this.switchFrame(page);
        const input = await frame.locator(selector);
        await input.fill('');
        await this.verboseLog('Cleared text', selector, 'Text box has been cleared.');
    }

    /**
     * Retrieves text content from a specified locator.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {string} selector - The selector for the element.
     * @returns {Promise<string>} - The text content of the element.
     */
    async getTextFromLocator(page, selector) {
        await this.verboseLog('Retrieving text from locator', selector, 'Getting text content.');
        const frame = await this.switchFrame(page);
        const element = await frame.locator(selector);
        const text = await element.textContent();
        await this.verboseLog('Retrieved text from locator', selector, `Text: "${text}"`);
        return text;
    }

    /**
     * Retrieves the value of a specified attribute from an element.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {string} selector - The selector for the element.
     * @param {string} attribute - The attribute to retrieve.
     * @returns {Promise<string>} - The value of the specified attribute.
     */
    async getTextFromAttribute(page, selector, attribute) {
        await this.verboseLog('Retrieving text from attribute', selector, `Getting attribute: "${attribute}".`);
        const frame = await this.switchFrame(page);
        const element = await frame.locator(selector);
        const value = await element.getAttribute(attribute);
        await this.verboseLog('Retrieved text from attribute', selector, `Attribute: "${attribute}", Value: "${value}"`);
        return value;
    }

    /**
     * Validates if an element is enabled.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {string} selector - The selector for the element.
     * @returns {Promise<void>} - Fails the test if the element is not enabled.
     */
    async validateElementIsEnabled(page, selector) {
        await this.verboseLog('Validating element is enabled', selector, 'Checking if element is enabled.');
        const frame = await this.switchFrame(page);
        const element = await frame.locator(selector);
        await element.waitFor({state: 'visible'});
        // Assert that the element is enabled
        await expect(element).toBeEnabled();

        await this.verboseLog('Validated element is enabled', selector, 'Element is enabled.');
    }


    /**
     * Validates if an element is disabled.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {string} selector - The selector for the element.
     * @returns {Promise<void>} - Fails the test if the element is not disabled.
     */
    async validateElementIsDisabled(page, selector) {
        await this.verboseLog('Validating element is disabled', selector, 'Checking if element is disabled.');
        const frame = await this.switchFrame(page);
        const element = await frame.locator(selector);

        // Assert that the element is disabled
        await expect(element).toBeDisabled();

        await this.verboseLog('Validated element is disabled', selector, 'Element is disabled.');
    }


    /**
     * Validates if a checkbox or radio button is selected.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {string} selector - The selector for the element.
     * @returns {Promise<void>} - Fails the test if the element is not selected.
     */
    async validateIsSelected(page, selector) {
        await this.verboseLog('Validating element is selected', selector, 'Checking if element is selected.');
        const frame = await this.switchFrame(page);
        const element = await frame.locator(selector);
        await expect(element).toBeChecked();
        await this.verboseLog('Validated element is selected', selector, `Is Selected: ${isSelected}`);
    }


    // New Methods for Additional UI Components

    /**
     * Selects an option from a dropdown menu.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {string} dropdownSelector - The selector for the dropdown menu.
     * @param {string} optionSelector - The selector for the option to select.
     * @returns {Promise<void>}
     */
    async selectDropdownOption(page, dropdownSelector, optionSelector) {
        await this.verboseLog('Selecting dropdown option', optionSelector, 'Attempting to select dropdown option.');
        const frame = await this.switchFrame(page);
        const dropdown = await frame.locator(dropdownSelector);
        await dropdown.selectOption(optionSelector); // Select the option
        await this.verboseLog('Selected dropdown option', optionSelector, 'Dropdown option has been selected successfully.');
    }


    /**
     * Accepts a JavaScript alert dialog.
     *
     * @param {Page} page - The Playwright Page object.
     * @returns {Promise<void>}
     */
    async acceptAlert(page) {
        const frame = await this.switchFrame(page);
        await this.verboseLog('Accepting alert', '', 'Waiting for alert dialog.');
        await frame.on('dialog', async dialog => {
            await dialog.accept();
            await this.verboseLog('Accepted alert', '', 'Alert has been accepted.');
        });
    }

    /**
     * Dismisses a JavaScript alert dialog.
     *
     * @param {Page} page - The Playwright Page object.
     * @returns {Promise<void>}
     */
    async dismissAlert(page) {
        const frame = await this.switchFrame(page);
        await this.verboseLog('Dismissing alert', '', 'Waiting for alert dialog.');
        await frame.on('dialog', async dialog => {
            await dialog.dismiss();
            await this.verboseLog('Dismissed alert', '', 'Alert has been dismissed.');
        });
    }

    /**
     * Waits for an element to be visible.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {string} selector - The selector for the element to wait for.
     * @returns {Promise<void>}
     */
    async waitAndSee(page, selector) {
        await this.verboseLog('Waiting for element to be visible', selector, 'Waiting for visibility.');
        const frame = await this.switchFrame(page);
        const element = await frame.locator(selector).first();
        await element.waitFor({state: 'visible'});
        await this.verboseLog('Waited for element to be visible', selector, 'Element is now visible.');
    }

    /**
     * Waits for an element to be visible and then performs a hover action on it.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {string} selector - The selector for the element to wait for.
     * @returns {Promise<void>}
     */
    async mouseHover(page, selector) {
        await this.verboseLog('Waiting for element to be visible', selector, 'Waiting for visibility.');
        const frame = await this.switchFrame(page);
        const element = frame.locator(selector);
        await element.waitFor({state: 'visible'});
        await element.hover();
        await this.verboseLog('Element is now visible and hovered', selector, 'Hover action completed.');
    }

    /**
     * Retrieves the current URL of the page.
     *
     * @param {Page} page - The Playwright Page object.
     * @returns {Promise<string>} - The current URL of the page.
     */
    async getCurrentUrl(page) {
        const frame = await this.switchFrame(page);
        const url = frame.url();
        await this.verboseLog('Retrieved current URL', '', `Current URL: "${url}"`);
        return url;
    }

    /**
     * Waits for an element to be visible on the specified page.
     *
     * @param {Page} page - The Playwright Page object representing the current page.
     * @param {string} selector - The selector for the element to wait for visibility.
     * @returns {Promise<boolean>} - A promise that resolves to true if the element is visible, or false if it is not.
     */
    async waitAndVisible(page, selector) {
        await this.verboseLog('Waiting for element to be visible', selector, 'Waiting for visibility.');
        const frame = await this.switchFrame(page);
        return await frame.locator(selector).waitFor({state: 'visible', timeout: 5000})
            .then(() => true)
            .catch(() => false);
    }


    // Keyboard Interaction Methods

    /**
     * Presses a specified key.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {string} key - The key to press (e.g., 'Enter', 'Escape').
     * @returns {Promise<void>}
     */
    async pressKey(page, key) {
        await this.verboseLog('Pressing key', key, 'Attempting to press key.');
        await page.keyboard.press(key);
        await this.verboseLog('Pressed key', key, 'Key has been pressed successfully.');
    }

    /**
     * Holds down a specified key.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {string} key - The key to hold down.
     * @returns {Promise<void>}
     */
    async holdKey(page, key) {
        await this.verboseLog('Holding key', key, 'Attempting to hold key.');
        await page.keyboard.down(key);
        await this.verboseLog('Held key', key, 'Key is being held down.');
    }

    /**
     * Releases a specified key.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {string} key - The key to release.
     * @returns {Promise<void>}
     */
    async releaseKey(page, key) {
        await this.verboseLog('Releasing key', key, 'Attempting to release key.');
        await page.keyboard.up(key);
        await this.verboseLog('Released key', key, 'Key has been released successfully.');
    }

    // New Methods for Scrolling, Uploading, and Downloading

    /**
     * Scrolls the page to make a specified element visible.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {string} selector - The selector for the element to scroll to.
     * @returns {Promise<void>}
     */
    async scrollToElement(page, selector) {
        await this.verboseLog('Scrolling to element', selector, 'Attempting to scroll to the element.');
        const frame = await this.switchFrame(page);
        const element = await frame.locator(selector);
        await element.scrollIntoViewIfNeeded();
        await this.verboseLog('Scrolled to element', selector, 'Element is now in view.');
    }

    /**
     * Uploads a file or multiple files using a specified input element.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {string} selector - The selector for the file input element.
     * @param {(string|string[])} filePath - The path(s) of the file(s) to upload. Can be a single file path or an array of paths.
     * @returns {Promise<void>}
     */
    async uploadFile(page, selector, filePath) {
        await this.verboseLog('Uploading file(s)', selector, `Attempting to upload file(s): "${Array.isArray(filePath) ? filePath.join(', ') : filePath}".`);
        const frame = await this.switchFrame(page);
        const input = await frame.locator(selector);

        // Check if the filePath is an array
        if (Array.isArray(filePath)) {
            await input.setInputFiles(filePath); // Upload multiple files
        } else {
            await input.setInputFiles(filePath); // Upload a single file
        }

        await this.verboseLog('Uploaded file(s)', selector, `File(s) uploaded: "${Array.isArray(filePath) ? filePath.join(', ') : filePath}".`);
    }


    /**
     * Downloads a file by clicking the specified element and waiting for the download event.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {string} selector - The selector for the element that initiates the download.
     * @param {string} [downloadPath='../downloads'] - The path where the downloaded file will be saved.
     * @returns {Promise<string>} - The path to the downloaded file.
     */
    async downloadFile(page, selector, downloadPath = '../downloads') {
        await this.verboseLog('Initiating file download', selector, 'Attempting to download file.');
        const downloadPromise = page.waitForEvent('download');
        await this.waitAndClick(page, selector);
        const download = await downloadPromise;
        const suggestedFilePath = `${downloadPath}/${download.suggestedFilename()}`;
        await download.saveAs(suggestedFilePath);
        await this.verboseLog('Downloaded file', selector, `File saved to: "${suggestedFilePath}".`);
        return suggestedFilePath; // Return the path to the downloaded file
    }
}

module.exports = new PlaywrightActions();
