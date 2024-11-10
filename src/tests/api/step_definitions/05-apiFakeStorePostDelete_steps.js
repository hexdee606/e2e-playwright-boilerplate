import {createBdd} from "playwright-bdd";
import {expect} from "@playwright/test";
import apiFakeStorePostDeletePage from "../pages/05-apiFakeStorePostDelete_page";
import apiFakeStorePostDeleteContract from "../../shared/contracts/05-apiFakeStorePostDelete_contract";

const {Given, When, Then} = createBdd();

Given(/^the user sends a request to create a new user via the Fake Store API$/, async function () {
    TestData.addAUserResponseData = await apiFakeStorePostDeletePage.addAUser();
});

When(/^the user validates the user creation response against the API contract$/, async function () {
    await apiFakeStorePostDeletePage.validateContract(apiFakeStorePostDeleteContract, TestData.addAUserResponseData);
});

Then(/^the user verifies the response contains the correct details and stores the user ID for future use$/, async function () {
    await expect(TestData.addAUserResponseData.id.toString()).toMatch(/^\d+$/);
});
