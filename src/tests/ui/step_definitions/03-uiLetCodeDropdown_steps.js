import {createBdd} from "playwright-bdd";

const {When, Then} = createBdd();

import uiLetCodeDropdown_page from "../pages/03-uiLetCodeDropdown_page";

When(/^the user selects "([^"]*)" from the dropdown list$/, async function ({page}, text) {
    await uiLetCodeDropdown_page.selectDropdownOption(page, text);
});

Then(/^the user verifies that "([^"]*)" is the selected option in the dropdown$/, async function ({page}, text) {
    await uiLetCodeDropdown_page.validateSelectedOption(page, text);
});
When(/^the user analyzes the webpage to identify accessibility issues$/, async function ({page}) {
    await page.goto("https://www.youtube.com/");
    await page.waitForLoadState('load');
    await AccessibilityHelper.checkWCAG2AAA(page);
});