import {createBdd} from "playwright-bdd";
import gqlGraphQLZeroPage from "../pages/04-gqlGraphQLZero_page";
import {expect} from "@playwright/test";

const {Given, When, Then} = createBdd();

Given(/^the user hits the get a post query$/, async function ({}) {
    TestData.graphQLZeroGetDeleteAPostResponse = await gqlGraphQLZeroPage.getAPost();
});

Then(/^the user validates the response of the get a post query$/, async function ({}) {
    const expectedResponse = {
        "post": {
            "id": "1",
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        }
    };
    await gqlGraphQLZeroPage.validateGetAPost(TestData.graphQLZeroGetDeleteAPostResponse.data, expectedResponse);
});

Given(/^the user hits the delete a post mutation for id (\d+)$/, async function ({}, id) {
    TestData.graphQLZeroGetDeleteAPostResponse = await gqlGraphQLZeroPage.deleteAPost(id);
});

Then(/^the user validates the response of the delete a post mutation$/, async function () {
    await expect(TestData.graphQLZeroGetDeleteAPostResponse.data.deletePost).toBe(true);
});