import { Page, expect } from "@playwright/test";

/**
 * Represents UI interactions for buttons on the LetCode page.
 *
 * This class provides methods for clicking buttons, navigating, and validating
 * the current page, as well as interacting with button coordinates and long-press actions.
 *
 * @class uiLetCodeButton
 */
class uiLetCodeButton {
    constructor() {
        this.button = (text) => `//button[text()="${text}"] | //h2[text()="${text}"]`;
    }

    /**
     * Clicks a button with the specified text.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {string} text - The text of the button to click.
     *
     * @returns {Promise<void>} - A promise that resolves when the button has been clicked.
     */
    async clickButton(page, text) {
        await PlaywrightActions.waitAndClick(page, this.button(text));
    }

    /**
     * Navigates back to the previous page.
     *
     * @param {Page} page - The Playwright Page object.
     *
     * @returns {Promise<void>} - A promise that resolves when the navigation is complete.
     */
    async navigateBack(page) {
        await page.goBack({ waitUntil: "domcontentloaded" });
    }

    /**
     * Validates that the current page URL is the home page URL.
     *
     * @param {Page} page - The Playwright Page object.
     * @throws {Error} Throws an error if the current URL does not match the expected home page URL.
     *
     * @returns {Promise<void>} - A promise that resolves when validation is complete.
     */
    async validateImOnHomePage(page) {
        await expect(page.url()).toBe("https://letcode.in/");
    }

    /**
     * Grabs the X and Y coordinates of a button element with the specified text.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {string} text - The text of the button to grab coordinates for.
     *
     * @returns {Promise<{x: number, y: number}>} - A promise that resolves to the coordinates of the element.
     */
    async grabXYCoordinatesOfElement(page, text) {
        return await PlaywrightActions.waitAndGetXYCoordinates(page, this.button(text));
    }

    /**
     * Performs a long press on a button at specified coordinates.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {number} x - The X coordinate for the long press.
     * @param {number} y - The Y coordinate for the long press.
     * @param {{width: number, height: number}} box - The dimensions of the button.
     *
     * @returns {Promise<void>} - A promise that resolves when the long press is complete.
     */
    async buttonLongPress(page, x, y, box) {
        await page.mouse.move(x + box.width / 2, y + box.height / 2);
        await page.mouse.down();
        await page.waitForTimeout(1000);
        await page.mouse.up();
    }

    /**
     * Validates that the button is visible after a long press.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {string} text - The text of the button to validate.
     *
     * @returns {Promise<void>} - A promise that resolves when validation is complete.
     */
    async validateLongPressedButton(page, text) {
        await PlaywrightActions.waitAndVisible(page, this.button(text));
    }
}

export default new uiLetCodeButton();
