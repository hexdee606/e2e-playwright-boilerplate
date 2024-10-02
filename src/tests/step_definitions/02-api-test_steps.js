import {createBdd} from "playwright-bdd";

const {Given, When, Then} = createBdd();
const {assert} = require("chai");

import {getUserList} from "../../api/pages/getUserList_page";
import {createUser} from "../../api/pages/createUser_page";

Given(/^the user fetch the user list of page (\d+)$/, async function ({}, pageNo) {
    TestData.api_response = await getUserList(pageNo);
});

Then(/^the user validates the response received for page (\d+)$/, async function ({}, pageNo) {
    await assert.equal(TestData.api_response.page, pageNo);
});

Given(/^the user creates a new user with name "([^"]*)" and job "([^"]*)"$/, async function ({}, name, job) {
    TestData.api_response = await createUser(name, job);
});

Then(/^the user validates the response contains name "([^"]*)" and job "([^"]*)"$/, async function ({}, name, job) {
    await assert.equal(TestData.api_response.name, name);
    await assert.equal(TestData.api_response.job, job);
});