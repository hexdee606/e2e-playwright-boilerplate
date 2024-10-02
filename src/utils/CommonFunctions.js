/**
 * CommonFunctions Class
 *
 * This class provides a collection of utility functions for various common operations,
 * including directory management, string manipulation, date formatting, and Excel file handling.
 *
 * Author: Dipen Chavan
 * Date: 2024-09-29
 */

const {Page, expect} = require('@playwright/test');
const {writeFileSync, unlinkSync, readdirSync, statSync, rmdirSync, existsSync} = require('fs');
const path = require('path');
const Excel = require('exceljs'); // Ensure you import Excel if you're using it

class CommonFunctions {
    constructor() {
        this.verifyAssertiveTextWithArraySelector = (text) => `//*[contains(text(),'${text}')] | //span[contains(.,'${text}')] | //*[contains(@placeholder, "${text}")]`;
    }

    /**
     * Recursively deletes a directory and its contents.
     * @param {string} dir - The directory to delete.
     */
    async rmdir(dir) {
        if (!existsSync(dir)) {
            console.error(`Directory not found: ${dir}`);
            return;
        }

        const list = readdirSync(dir);
        for (const filename of list) {
            const fullPath = path.join(dir, filename);
            const stat = statSync(fullPath);
            if (stat.isDirectory()) {
                await this.rmdir(fullPath);
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
    async replaceAll(str, term, replacement) {
        if (typeof str !== 'string') {
            console.error('Invalid input. Please provide a valid string.');
            return '';
        }
        return str.replace(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
    }

    /**
     * Verifies the presence of text from an object array in the UI.
     * @param {Page} page - The Playwright page object.
     * @param {Object} inputs - The object containing text to verify.
     * @param {number} [sec=10] - The number of seconds to wait (default time is 10 sec).
     * @throws {Error} Throws an error if the text is not found.
     */
    async verifyAssertiveTextWithArray(page, inputs, sec = 10) {
        const assertText = {};

        const recursiveTextGrab = async (obj, currentKey = '') => {
            for await (const key in obj) {
                const newKey = currentKey ? `${currentKey}.${key}` : key;
                if (typeof obj[key] === 'object') {
                    await recursiveTextGrab(obj[key], newKey);
                } else {
                    assertText[newKey] = obj[key];
                }
            }
        };

        await recursiveTextGrab(inputs);

        for await (const key in assertText) {
            const texts = Array.isArray(assertText[key]) ? assertText[key] : [assertText[key]];
            for await (const text of texts) {
                try {
                    await PlaywrightActions.waitAndSee(page, this.verifyAssertiveTextWithArraySelector(text));
                } catch {
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
    async getDateFromEpoch(epochDateAndTime) {
        if (typeof epochDateAndTime !== 'number') {
            console.error('Invalid input. Please provide a valid epoch timestamp.');
            return '';
        }
        return new Date(epochDateAndTime).toLocaleDateString('en-GB');
    }

    /**
     * Rounds a number to a specified number of decimal places and formats it.
     * @param {number} value - The number to round.
     * @param {number} decimal - The number of decimal places.
     * @returns {string} The formatted number.
     */
    async roundOfDecimal(value, decimal) {
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
     * @throws {Error} Throws an error if the value is out of range (unless isFindBudget is true).
     */
    async verifyValueIsInBetween(value, min, max, isFindBudget = false) {
        if (typeof value !== 'number' || typeof min !== 'number' || typeof max !== 'number') {
            console.error('Invalid input. Please provide valid numbers for value, min, and max.');
            return false;
        }
        if (value < min || value > max) {
            if (!isFindBudget) {
                throw new Error(`Value (${value}) is not between ${min} and ${max}.`);
            }
            return false;
        }
        console.log(`Value (${value}) is between ${min} and ${max}.`);
        return true;
    }

    /**
     * Finds the minimum and maximum values based on a budget and percentage.
     * @param {number} value - The number.
     * @param {number} percentage - The percentage to calculate the range.
     * @returns {Object} The minimum and maximum values.
     */
    async findMinAndMaxValue(value, percentage) {
        if (typeof value !== 'number' || typeof percentage !== 'number' || percentage < 0) {
            console.error('Invalid input. Please provide valid numbers for value and percentage.');
            return {min: null, max: null};
        }
        const percentDecimal = percentage / 100;
        return {
            min: Math.round(value - (percentDecimal * value)),
            max: Math.round(value + (percentDecimal * value))
        };
    }

    /**
     * Wraps a string to a specified length, optionally including an ellipsis.
     * @param {string} string - The string to wrap.
     * @param {number} len - The length to wrap to.
     * @param {boolean} [includeEllipsis=false] - Whether to include an ellipsis.
     * @returns {string} The wrapped string.
     */
    async charWrapWithEllipsis(string, len, includeEllipsis = false) {
        if (typeof string !== 'string' || typeof len !== 'number' || len < 0) {
            console.error('Invalid input. Please provide a valid string and length.');
            return '';
        }
        return string.length <= len
            ? string
            : includeEllipsis ? `${string.substring(0, len)}...` : string.substring(0, len);
    }

    /**
     * Transforms a Gherkin table into an array of objects.
     * Each object represents a row in the table, with keys corresponding to headers.
     * @param {Object} table - The Gherkin table object containing rawTable (array of arrays).
     * @returns {Array<Object>} - An array of objects where each object represents a row from the table.
     */
    async transformTable(table) {
        if (!table || !table.rawTable || table.rawTable.length === 0) {
            console.error('Invalid table format.');
            return [];
        }

        const rawTable = await table.rawTable;
        const headers = await rawTable[0];
        const rows = await rawTable.slice(1);

        return await rows.map(async row => {
            const obj = {};
            await row.forEach((value, index) => {
                obj[headers[index]] = value;
            });
            return obj;
        });
    }

    /**
     * Rounds a number to the nearest integer or to one decimal place if zero.
     * @param {number} num - The number to round.
     * @returns {string} - The rounded value as a string.
     */
    async roundToNearestTenthOrInt(num) {
        let rounded = Math.round(num);
        return rounded === 0 ? parseFloat(num.toFixed(1)) : rounded.toLocaleString('en-US', {maximumFractionDigits: 0});
    }


    /**
     * Capitalizes the first letter of a string.
     * @param {string} str - The input string.
     * @returns {Promise<string>} - The modified string.
     */
    async capitalizeFirstWord(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    /**
     * Wraps a string to a specified length, optionally including an ellipsis.
     * @param {string} string - The string to wrap.
     * @param {number} len - The length to wrap to.
     * @param {boolean} [includeEllipsis=false] - Whether to include an ellipsis.
     * @returns {string} The wrapped string.
     */
    async charWrap(string, len, includeEllipsis = false) {
        if (string.length <= len) {
            return string;
        } else {
            return includeEllipsis ? `${string.substring(0, len)}...` : string.substring(0, len);
        }
    }

    /**
     * Reads an Excel file and returns its contents as a JSON object.
     * @param {string} filePath - The path to the Excel file.
     * @param {number|string} workSheetIndexOrName - The index or name of the worksheet to read.
     * @returns {Promise<Object[]>} The JSON object representation of the worksheet data.
     * @throws {Error} Throws an error if the worksheet is not found or if the worksheet is empty.
     */
    async readExcel(filePath, workSheetIndexOrName) {
        const workbook = new Excel.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(workSheetIndexOrName);

        if (!worksheet) {
            throw new Error(`Worksheet with index or name "${workSheetIndexOrName}" not found.`);
        }

        let data = [];
        worksheet.eachRow({includeEmpty: false}, (row) => {
            data.push(row.values);
        });

        if (data.length === 0) {
            throw new Error("The worksheet is empty.");
        }

        const headers = data[0].slice(1);
        return data.slice(1).map((row) => {
            let rowData = {};
            headers.forEach((header, colIndex) => {
                rowData[header] = row[colIndex + 1]; // +1 to account for the slice(1) offset
            });
            return rowData;
        });
    }
}

module.exports = new CommonFunctions();
