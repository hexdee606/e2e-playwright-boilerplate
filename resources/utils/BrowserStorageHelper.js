/**
 * BrowserStorageHelper Class
 *
 * This class provides methods for managing browser storage (local and session) using Playwright.
 * It allows for retrieval of keys and values from local storage and session storage within iframes.
 *
 * Author: Hexdee606
 * Date: 2024-09-29
 */

import {Page, Frame} from '@playwright/test';

/**
 * A utility class for managing browser storage operations.
 */
class BrowserStorageHelper {
    /**
     * Retrieves all keys and their values from local storage and returns them as a JSON object.
     * @param {Page} page - The Playwright page object.
     * @param {string} [partialUrl=""] - A partial URL to identify the correct iframe.
     * @returns {Promise<Object>} A promise that resolves to a JSON object containing local storage keys and their values.
     * @throws {Error} Throws an error if the frame cannot be switched or evaluated.
     */
    async getLocalStorageKeysAndValues(page, partialUrl = "") {
        const frame = await this._getFrame(page, partialUrl);

        return await frame.evaluate(() => {
            return Array.from({length: localStorage.length}, (_, i) => {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                return {
                    [key]: this._parseLocalStorageValue(value)
                };
            }).reduce((acc, curr) => Object.assign(acc, curr), {});
        });
    }

    /**
     * Retrieves all keys and their values from session storage and returns them as a JSON object.
     * @param {Page} page - The Playwright page object.
     * @param {string} [partialUrl=""] - A partial URL to identify the correct iframe. Defaults to an empty string.
     * @returns {Promise<Object>} A promise that resolves to a JSON object containing session storage keys and their values.
     * @throws {Error} Throws an error if the frame cannot be switched or evaluated.
     */
    async getSessionStorageKeysAndValues(page, partialUrl = "") {
        const frame = await this._getFrame(page, partialUrl);

        return await frame.evaluate(() => {
            return Array.from({length: sessionStorage.length}, (_, i) => {
                const key = sessionStorage.key(i);
                const value = sessionStorage.getItem(key);
                return {
                    [key]: this._parseSessionStorageValue(value)
                };
            }).reduce((acc, curr) => Object.assign(acc, curr), {});
        });
    }

    /**
     * Switches to the iframe that contains the given partial URL. If not found, returns the main page.
     * @param {Page} page - The Playwright page object.
     * @param {string} partialUrl - A unique part of the URL of the iframe to switch to.
     * @returns {Promise<Frame|Page>} A promise that resolves to the Playwright frame object if found, otherwise the main page.
     */
    async _getFrame(page, partialUrl) {
        if (PlaywrightActions.getCurrentFrameStatus().setFrame) {
            return await this.switchFrameByPartialUrl(page, partialUrl);
        }
        return page;
    }

    /**
     * Parses a local storage value, attempting to convert it to JSON.
     * @param {string} value - The value to parse.
     * @returns {*} The parsed value or the original string if parsing fails.
     * @private
     */
    _parseLocalStorageValue(value) {
        try {
            return JSON.parse(value);
        } catch {
            return value; // Return the original string if JSON parsing fails
        }
    }

    /**
     * Parses a session storage value, attempting to convert it to JSON.
     * @param {string} value - The value to parse.
     * @returns {*} The parsed value or the original string if parsing fails.
     * @private
     */
    _parseSessionStorageValue(value) {
        return this._parseLocalStorageValue(value); // Reuse the same parsing logic
    }

    /**
     * Switches to the iframe that contains the given partial URL. If not found, returns the main page.
     * @param {Page} page - The Playwright page object.
     * @param {string} partialUrl - A unique part of the URL of the iframe to switch to.
     * @returns {Promise<Frame|Page>} A promise that resolves to the Playwright frame object if found, otherwise the main page.
     */
    async switchFrameByPartialUrl(page, partialUrl) {
        const iframes = page.frames();
        const matchingFrame = iframes.find(frame => frame.url().includes(partialUrl));

        if (matchingFrame) {
            return matchingFrame;
        } else {
            console.warn(`Iframe containing URL with part "${partialUrl}" not found. Returning the main page.`);
            return page;
        }
    }
}

module.exports = new BrowserStorageHelper();
