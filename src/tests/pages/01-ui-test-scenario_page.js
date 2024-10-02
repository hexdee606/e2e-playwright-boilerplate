import {Page} from "@playwright/test";

let dynamicLocators = {
    validateText: (text) => `//*[text()="${text}"] | //*[@value="${text}"]`,
    selectRadioButton: (text) => `//input[@value="${text}"]`,
    fillTextBox: (text) => `//input[@name="${text}"]`,
    checkBoxSelect: (text) => `//label[text()="${text}"]/..//input`
}

class ui_test_scenario_page {
    constructor() {
        this.validateIOnLoginAndSignupPageLocator = `//h2[text()="New User Signup!"]`;
        this.fillNameLocator = `//input[@name="name"]`;
        this.fillEmailLocator = `(//input[@name="email"])[2]`;
    }

    /**
     * @param {Page} page - Playwright page object
     * */
    async validateIOnLoginAndSignupPage(page) {
        await PlaywrightActions.waitAndSee(page, await this.validateIOnLoginAndSignupPageLocator);
    }

    /**
     * @param {Page} page - Playwright page object
     * @param {string} name - input string name
     * @param {string} email - input string email
     * */
    async fillNameAndEmail(page, name, email) {
        await PlaywrightActions.waitAndFillField(page, this.fillNameLocator, name);
        await PlaywrightActions.waitAndFillField(page, this.fillEmailLocator, email);
    }

    /**
     * @param {Page} page - Playwright page object
     * */
    async fillAndValidateUserDetails(page) {
        const data = TestData.signup_test_data;
        const AddressInformation = data.AddressInformation;
        await PlaywrightActions.waitAndSee(page, dynamicLocators.validateText("Enter Account Information"));
        await PlaywrightActions.waitAndClick(page, dynamicLocators.selectRadioButton(data.title));
        await PlaywrightActions.waitAndSee(page, dynamicLocators.validateText(data.Name));
        await PlaywrightActions.waitAndSee(page, dynamicLocators.validateText(data.Email));
        await PlaywrightActions.waitAndFillField(page, dynamicLocators.fillTextBox("password"), data.Password);
        await page.pause();
        // await page.locator('#days').selectOption('1');
        // await page.locator('#months').selectOption('1');
        // await page.locator('#years').selectOption('2021');
        await PlaywrightActions.selectDropdownOption(page, '#days',data.dateOfBirth.day)
        await PlaywrightActions.selectDropdownOption(page,'#months', data.dateOfBirth.month);
        await PlaywrightActions.selectDropdownOption(page,'#years', data.dateOfBirth.year);
        await PlaywrightActions.checkCheckbox(page, dynamicLocators.checkBoxSelect("Sign up for our newsletter!"));
        await PlaywrightActions.checkCheckbox(page, dynamicLocators.checkBoxSelect("Receive special offers from our partners!"));
        await PlaywrightActions.waitAndFillField(page, dynamicLocators.fillTextBox('first_name'), AddressInformation.firstName);
        await PlaywrightActions.waitAndFillField(page, dynamicLocators.fillTextBox('last_name'), AddressInformation.lastName);
        await PlaywrightActions.waitAndFillField(page, dynamicLocators.fillTextBox('company'), AddressInformation.company);
        await PlaywrightActions.waitAndFillField(page, dynamicLocators.fillTextBox('address1'), AddressInformation.addressLine1);
        await PlaywrightActions.waitAndFillField(page, dynamicLocators.fillTextBox('address2'), AddressInformation.addressLine2);
        await PlaywrightActions.waitAndFillField(page, dynamicLocators.fillTextBox('state'), AddressInformation.state);
        await PlaywrightActions.waitAndFillField(page, dynamicLocators.fillTextBox('city'), AddressInformation.city);
        await PlaywrightActions.waitAndFillField(page, dynamicLocators.fillTextBox('zipcode'), AddressInformation.zipcode);
        await PlaywrightActions.waitAndFillField(page, dynamicLocators.fillTextBox('mobile_number'), AddressInformation.mobileNumber);
    }
}

module.exports = new ui_test_scenario_page();