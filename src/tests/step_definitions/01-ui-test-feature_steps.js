import {createBdd} from "playwright-bdd";

const {Given, When, Then} = createBdd();
const ui_test_scenario_page = require("../pages/01-ui-test-scenario_page");

Given(/^the user is on the homepage$/, async function ({page}) {
    await page.goto("");
    await page.waitForLoadState("load");
    await page.pause();
});
When(/^the user clicks on the "([^"]*)" button$/, async function ({page}, buttonText) {
    await PlaywrightActions.waitAndClick(page, `//*[text()="${buttonText}"]`);
});
Then(/^the user should be on the login and signup page$/, async function ({page}) {
    await ui_test_scenario_page.validateIOnLoginAndSignupPage(page);
});
When(/^the user signs up with the name "([^"]*)" and email "([^"]*)"$/, async function ({page}, name, email) {
    await ui_test_scenario_page.fillNameAndEmail(page, name, email);
    TestData.signup_test_data.Name = name;
    TestData.signup_test_data.Email = email;
});
When(/^the user fills in the required information$/, async function ({page}) {
    await ui_test_scenario_page.fillAndValidateUserDetails(page);
});
Then(/^the user should see the "([^"]*)" confirmation message$/, async function ({page}, assertText) {
    await PlaywrightActions.waitAndSee(page, `//*[text()="${assertText}"]`);
});
Then(/^the user should be logged in as "([^"]*)"$/, async function ({page}, name) {
    await PlaywrightActions.waitAndSee(page, `//*[text()="${name}"]`);
});