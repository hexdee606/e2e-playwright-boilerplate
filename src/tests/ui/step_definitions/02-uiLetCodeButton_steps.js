import {createBdd} from "playwright-bdd";

const {When, Then} = createBdd();

import uiLetCodeButton_page from "../pages/02-uiLetCodeButton_page";

When(/^the user clicks the "([^"]*)" button$/, async function ({page}, text) {
    await uiLetCodeButton_page.clickButton(page, text);
});

Then(/^the user should see that they are on the home page of the web application$/, async function ({page}) {
    await uiLetCodeButton_page.validateImOnHomePage(page);
});

Then(/^the user navigates back to the previous page using the browser's back button$/, async function ({page}) {
    await uiLetCodeButton_page.navigateBack(page);
});

When(/^the user retrieves the x and y coordinates of the "([^"]*)" button$/, async function ({page}, text) {
    TestData.XYCoordinates = await uiLetCodeButton_page.grabXYCoordinatesOfElement(page, text);
});

Then(/^the user logs the x and y coordinates to the console$/, async function ({page}) {
    await console.log(TestData.XYCoordinates);
});

When(/^the user long presses the "([^"]*)" button$/, async function ({page}, text) {
    const {x, y, box} = await uiLetCodeButton_page.grabXYCoordinatesOfElement(page, text);
    await uiLetCodeButton_page.buttonLongPress(page, x, y, box);
});

Then(/^the user validates that the button text has changed to "([^"]*)"$/, async function ({page}, text) {
    await uiLetCodeButton_page.validateLongPressedButton(page, text);
});