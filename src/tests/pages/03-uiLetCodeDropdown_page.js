import {Page} from "@playwright/test"
import {AxeBuilder} from "@axe-core/playwright";

/**
 * Represents the UI interactions for the dropdown on the LetCode page.
 *
 * This class provides methods to interact with the fruits dropdown and validate
 * the selected option by checking the corresponding text displayed on the page.
 *
 * @class uiLetCodeDropdown
 */
class uiLetCodeDropdown {
    /**
     * Creates an instance of uiLetCodeDropdown.
     *
     * Initializes the selectors for the dropdown, options, and selected fruit text.
     */
    constructor() {
        this.fruits = `//select[@id="fruits"]`;
        this.option = (option) => `//option[text()="${option}"]`;
        this.selectedFruitText = (option) => `//p[text()="You have selected ${option}"]`;
    }

    /**
     * Selects an option from the dropdown.
     *
     * @param {Page} page - The Playwright page instance to perform actions on.
     * @param {string} option - The option to select from the dropdown.
     *
     * @returns {Promise<void>} - A promise that resolves when the option has been selected.
     */
    async selectDropdownOption(page, option) {
        await PlaywrightActions.selectDropdownOption(page, this.fruits, option);
    }

    /**
     * Validates the selected option by checking the displayed text.
     *
     * @param {Page} page - The Playwright page instance to perform actions on.
     * @param {string} option - The option that was selected, used to validate the displayed text.
     *
     * @returns {Promise<void>} - A promise that resolves when the validation is complete.
     */
    async validateSelectedOption(page, option) {
        await PlaywrightActions.waitAndSee(page, this.selectedFruitText(option));
        const a = await new AxeBuilder({page}).withTags(['wcag2a'])
    }
}

export default new uiLetCodeDropdown();
