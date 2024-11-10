import {Page, expect} from "@playwright/test";

/**
 * Represents the UI interactions for the input box page on the LetCode website.
 *
 * This class provides methods for navigating to the workspace, interacting with input fields,
 * and validating the state of elements on the page.
 *
 * @class uiLetCodeInputBoxPage
 */
class uiLetCodeInputBoxPage {
    constructor() {
        this.workSpace = `//a[text()="Work-Space"]`;
        this.selectOption = (text) => `//*[text()="${text}"]`;
        this.inputFullName = `//input[@id="fullName"]`;
        this.inputReadOnly = `//input[@id="dontwrite"]`;
    }

    /**
     * Navigates to a specified page URL and waits for the page to be fully loaded.
     *
     * @param {Page} page - The Playwright page instance to navigate.
     * @throws {Error} Throws an error if the navigation fails.
     *
     * @example
     * await amOnPage(page);
     */
    async amOnPage(page) {
        await page.goto("");
        await page.waitForLoadState("domcontentloaded");
    }

    /**
     * Navigates to the workspace by clicking the workspace element.
     *
     * @param {Page} page - The Playwright Page object.
     *
     * @returns {Promise<void>} - A promise that resolves when navigation is complete.
     */
    async navigateToWorkspace(page) {
        await PlaywrightActions.waitAndClick(page, this.workSpace);
    }

    /**
     * Clicks on a specified workspace option by its text.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {string} text - The text of the workspace option to click.
     *
     * @returns {Promise<void>} - A promise that resolves when the click action is complete.
     */
    async clickOnWorkspaceOption(page, text) {
        await PlaywrightActions.waitAndClick(page, this.selectOption(text));
    }

    /**
     * Enters a full name into the full name input field.
     *
     * @param {Page} page - The Playwright Page object.
     * @param {string} fullName - The full name to enter into the input field.
     *
     * @returns {Promise<void>} - A promise that resolves when the input action is complete.
     */
    async enterFullName(page, fullName) {
        await PlaywrightActions.waitAndFillFieldSequentially(page, this.inputFullName, fullName);
    }

    /**
     * Validates that the input field for the full name contains the expected value.
     *
     * @param {Page} page - The Playwright Page object.
     * @throws {Error} Throws an error if the actual value does not match the expected value.
     *
     * @returns {Promise<void>} - A promise that resolves when validation is complete.
     */
    async validateFullNameStrings(page) {
        const {firstName, lastName} = TestData.fullName;
        const expected = `${firstName} ${lastName}`;

        const actual = await PlaywrightActions.getInputValue(page, this.inputFullName);
        await expect(actual).toEqual(expected);
    }

    /**
     * Validates that the specified text box is read-only.
     *
     * @param {Page} page - The Playwright Page object.
     * @returns {Promise<boolean>} - A promise that resolves to true if the text box is read-only, false otherwise.
     */
    async validateTextBoxIsReadOnly(page) {
        await PlaywrightActions.validateElementIsReadOnly(page, this.inputReadOnly);
    }
}

export default new uiLetCodeInputBoxPage();
