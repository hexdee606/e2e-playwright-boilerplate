const { chromium } = require('playwright'); // Adjust if you're using a different browser

class browser_storage_support {
    /**
     * Retrieves all keys and their values from local storage and returns them as a JSON object.
     * @param {Page} page - The Playwright page object.
     * @returns {Promise<Object>} A JSON object with local storage keys and their values.
     */
    async getLocalStorageKeysAndValues(page) {
        return await page.evaluate(() => {
            const localStorageData = {};
            // Iterate over all local storage items
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                // Attempt to parse the value as JSON if possible
                try {
                    localStorageData[key] = JSON.parse(value);
                } catch (e) {
                    // If parsing fails, store the raw value
                    localStorageData[key] = value;
                }
            }
            return localStorageData;
        });
    }

    /**
     * Retrieves all keys and their values from session storage and returns them as a JSON object.
     * @param {Page} page - The Playwright page object.
     * @returns {Promise<Object>} A JSON object with session storage keys and their values.
     */
    async getSessionStorageKeysAndValues(page) {
        return await page.evaluate(() => {
            const sessionStorageData = {};
            // Iterate over all session storage items
            for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);
                const value = sessionStorage.getItem(key);
                // Attempt to parse the value as JSON if possible
                try {
                    sessionStorageData[key] = JSON.parse(value);
                } catch (e) {
                    // If parsing fails, store the raw value
                    sessionStorageData[key] = value;
                }
            }
            return sessionStorageData;
        });
    }
}

module.exports = new browser_storage_support();
