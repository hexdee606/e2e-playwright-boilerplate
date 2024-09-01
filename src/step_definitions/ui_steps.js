const {createBdd} = require("playwright-bdd");
const {Given, When, Then} = createBdd();

Given(/^the user has navigated to the homepage$/, async function ({page}) {
    await page.goto("");
    const data = await browser_storage_support.getLocalStorageKeysAndValues(page);
    console.log(await data);
});