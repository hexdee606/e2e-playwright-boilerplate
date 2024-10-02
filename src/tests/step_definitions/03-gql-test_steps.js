import {createBdd} from "playwright-bdd";
const {Given, When, Then} = createBdd();

const {assert} = require("chai");

const gql_get_a_post = require("../../graphql/queries/03-gql_get_a_post");
const gql_delete_a_post = require("../../graphql/mutations/03-gql_delete_a_post");
const gql_test_model = require("../../graphql/models/03-gql-test_model");

Given(/^the user hits the get a post query$/, async function () {
    TestData.gql_response = await GraphqlHelper.sendRequest(gql_get_a_post.query);
});

Then(/^the user validates the response of the get a post query$/, function () {
    const expectedData = {
        "post": {
            "id": "1",
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        }
    }

    assert.deepEqual(TestData.gql_response.data, expectedData);
});

Given(/^the user hits the delete a post mutation for id (\d+)$/, async function ({}, id) {
    gql_test_model.deleteData.id = id
    TestData.gql_response = await GraphqlHelper.sendRequest(gql_delete_a_post.mutation, gql_test_model.deleteData);
});

Then(/^the user validates the response of the delete a post mutation$/, function () {
    assert.equal(true, TestData.gql_response.data.deletePost);
});
