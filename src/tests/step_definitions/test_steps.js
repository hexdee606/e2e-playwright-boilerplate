import {createBdd} from 'playwright-bdd';

const {Given, When, Then} = createBdd();

Given(/^test given$/, async function ({page}) {
    await page.goto("");
    await page.waitForLoadState('networkidle');
});