import {createBdd} from "playwright-bdd";

const {Given, When, Then} = createBdd();
import uiLetCodeInputBox_page from "../pages/01-uiLetCodeInputBox_page";


Given(/^the user navigates to the LetCode website$/, async function ({page}) {
    await uiLetCodeInputBox_page.amOnPage(page);
});

When(/^the user navigates to the workspace for further actions$/, async function ({page}) {
    await uiLetCodeInputBox_page.navigateToWorkspace(page);
});

Then(/^the user selects the "([^"]*)" option from the screen$/, async function ({page}, text) {
    await uiLetCodeInputBox_page.clickOnWorkspaceOption(page, text);
});

When(/^the user enters their full name$/, async function ({page}) {
    const {firstName, lastName} = TestData.fullName;
    const fullName = `${firstName} ${lastName}`;
    await uiLetCodeInputBox_page.enterFullName(page, fullName);
});

Then(/^the user should validate that the entered full name is correct$/, async function ({page}) {
    await uiLetCodeInputBox_page.validateFullNameStrings(page);
});
When(/^the user checks the read-only status of the input text box$/, async function ({page}) {
    await uiLetCodeInputBox_page.validateTextBoxIsReadOnly(page);
});