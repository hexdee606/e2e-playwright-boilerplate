const { expect } = require('@playwright/test');
const { writeFileSync, unlinkSync, readdirSync, statSync, rmdirSync, existsSync } = require('fs');
const path = require('path');

class common_function {
    constructor(page) {
        this.page = page;
    }

    /**
     * Recursively deletes a directory and its contents.
     * @param {string} dir - The directory to delete.
     */
    rmdir(dir) {
        if (!existsSync(dir)) {
            console.error(`Directory not found: ${dir}`);
            return;
        }

        const list = readdirSync(dir);
        for (const filename of list) {
            const fullPath = path.join(dir, filename);
            const stat = statSync(fullPath);
            if (stat.isDirectory()) {
                this.rmdir(fullPath);
            } else {
                unlinkSync(fullPath);
            }
        }
        rmdirSync(dir);
    }

    /**
     * Replaces all occurrences of a term in a string with a replacement.
     * @param {string} str - The original string.
     * @param {string} term - The term to replace.
     * @param {string} replacement - The replacement term.
     * @returns {string} The modified string.
     */
    replaceAll(str, term, replacement) {
        if (typeof str !== 'string') {
            console.error('Invalid input. Please provide a valid string.');
            return '';
        }
        return str.replace(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
    }

    /**
     * Verifies the presence of text from an object array in the UI.
     * @param {Object} inputs - The object containing text to verify.
     * @param {number} [sec=10] - The number of seconds to wait (default time is 10 sec).
     */
    async verifyAssertiveTextWithArray(inputs, sec = 10) {
        const assertText = {};

        function recursiveTextGrab(obj, currentKey = '') {
            for (const key in obj) {
                const newKey = currentKey ? `${currentKey}.${key}` : key;
                if (typeof obj[key] === 'object') {
                    recursiveTextGrab(obj[key], newKey);
                } else {
                    assertText[newKey] = obj[key];
                }
            }
        }

        recursiveTextGrab(inputs);

        for (const key in assertText) {
            const texts = Array.isArray(assertText[key]) ? assertText[key] : [assertText[key]];
            for (const text of texts) {
                const locator = `//*[contains(text(),'${text}')] | //span[contains(.,'${text}')] | //*[contains(@placeholder, "${text}")]`;
                await this.page.waitForSelector(locator, { timeout: sec * 1000 });
                const element = await this.page.$(locator);
                if (!element) {
                    throw new Error(`Text "${text}" not found within ${sec} seconds.`);
                }
            }
        }
    }

    /**
     * Converts an epoch date to a locale date string.
     * @param {number} epochDateAndTime - The epoch date and time.
     * @returns {string} The formatted date string.
     */
    getDateFromEpoch(epochDateAndTime) {
        if (typeof epochDateAndTime !== 'number') {
            console.error('Invalid input. Please provide a valid epoch timestamp.');
            return '';
        }
        const normalDate = new Date(epochDateAndTime);
        return normalDate.toLocaleDateString('en-GB');
    }

    /**
     * Rounds a number to a specified number of decimal places and formats it.
     * @param {number} value - The number to round.
     * @param {number} decimal - The number of decimal places.
     * @returns {string} The formatted number.
     */
    roundOfDecimal(value, decimal) {
        if (typeof value !== 'number' || isNaN(value) || typeof decimal !== 'number' || decimal < 0) {
            console.error('Invalid input. Please provide a valid number and decimal places.');
            return '';
        }

        const roundedValue = Number(value.toFixed(decimal));

        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: decimal,
            maximumFractionDigits: decimal
        }).format(roundedValue);
    }

    /**
     * Verifies if a value is between a minimum and maximum range.
     * @param {number} value - The value to check.
     * @param {number} min - The minimum value.
     * @param {number} max - The maximum value.
     * @param {boolean} [isFindBudget=false] - Flag indicating if it’s for budget finding.
     * @returns {boolean} True if the value is within the range, false otherwise.
     */
    verifyValueIsInBetween(value, min, max, isFindBudget = false) {
        if (typeof value !== 'number' || typeof min !== 'number' || typeof max !== 'number') {
            console.error('Invalid input. Please provide valid numbers for value, min, and max.');
            return false;
        }
        if (value < min || value > max) {
            if (!isFindBudget) {
                throw new Error(`Value (${value}) is not between ${min} and ${max}.`);
            } else {
                return false;
            }
        } else {
            console.log(`Value (${value}) is between ${min} and ${max}.`);
            return true;
        }
    }

    /**
     * Finds the minimum and maximum values based on a budget and percentage.
     * @param {number} value - The number.
     * @param {number} percentage - The percentage to calculate the range.
     * @returns {Object} The minimum and maximum values.
     */
    findMinAndMaxValue(value, percentage) {
        if (typeof value !== 'number' || typeof percentage !== 'number' || percentage < 0) {
            console.error('Invalid input. Please provide valid numbers for value and percentage.');
            return { min: null, max: null };
        }
        const percentDecimal = percentage / 100;
        const min = Math.round(value - (percentDecimal * value));
        const max = Math.round(value + (percentDecimal * value));
        return { min, max };
    }

    /**
     * Wraps a string to a specified length, optionally including an ellipsis.
     * @param {string} string - The string to wrap.
     * @param {number} len - The length to wrap to.
     * @param {boolean} [includeEllipsis=false] - Whether to include an ellipsis.
     * @returns {string} The wrapped string.
     */
    charWrapWithEllipsis(string, len, includeEllipsis = false) {
        if (typeof string !== 'string' || typeof len !== 'number' || len < 0) {
            console.error('Invalid input. Please provide a valid string and length.');
            return '';
        }
        if (string.length <= len) {
            return string;
        } else {
            return includeEllipsis ? string.substring(0, len) + '...' : string.substring(0, len);
        }
    }

    /**
     * Transforms a Gherkin table into an array of objects.
     * Each object represents a row in the table, with keys corresponding to headers.
     * @param {Object} table - The Gherkin table object containing rows and cells.
     * @returns {Array<Object>} - An array of objects where each object represents a row from the table.
     */
    transformTable(table) {
        if (!table || !table.rows || table.rows.length === 0) {
            console.error('Invalid table format.');
            return [];
        }

        const rows = table.rows;

        // Extract and remove the header row from the rows array
        const headerRow = rows.shift();

        // Map the header row cells to their values to create an array of headers
        const headers = headerRow.cells.map(item => item.value);

        // Transform each row into an object using headers as keys
        return rows.map(row => {
            // Create an object for each row
            let obj = {};
            // Assign values from each cell to the corresponding header key
            row.cells.forEach((item, index) => {
                obj[headers[index]] = item.value;
            });
            return obj;
        });
    }
}

module.exports = common_function;
