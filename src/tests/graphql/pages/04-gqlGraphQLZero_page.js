import {expect} from "@playwright/test";
import {query} from "../queries/04-gqlGraphQLZeroGetAPost";
import {mutation} from "../mutations/04-gqlGraphQLZeroDeleteAPost";
import {deleteData} from "../../shared/models/04-gqlGraphQLZeroDeleteAPost_model";
import GraphQLZeroGetAPostContract from "../../shared/contracts/04-GraphQLZeroGetAPost_contract";

/**
 * Class representing the GraphQL API for a blogging platform.
 * Provides methods to interact with the API, including fetching and deleting posts.
 */
class gqlGraphQLZeroPage {
    /**
     * Create an instance of gqlGraphQLZeroPage.
     */
    constructor() {
    }

    /**
     * Fetch a post using a GraphQL query.
     *
     * @returns {Promise<Object>} The response from the GraphQL API containing the post data.
     */
    async getAPost() {
        return GraphqlHelper.sendRequest(query);
    }

    /**
     * Delete a post by its ID using a GraphQL mutation.
     *
     * @param {string} id - The ID of the post to delete.
     * @returns {Promise<Object>} The response from the GraphQL API after deletion.
     */
    async deleteAPost(id) {
        deleteData.id = id;
        return GraphqlHelper.sendRequest(mutation, deleteData);
    }

    /**
     * Validate the GraphQL response against a given contract schema.
     *
     * @param {Object} contract - The Zod schema to validate against.
     * @param {Object} graphQLResponse - The GraphQL response object to validate.
     * @returns {Promise<void>}
     */
    async validateContract(contract, graphQLResponse) {
        const validationResult = await contract.safeParse(graphQLResponse);

        if (!validationResult.success) {
            console.error('Validation errors:', validationResult.error.errors);
        }

        await expect(validationResult.success).toBe(true);
    }

    /**
     * Validate the response of the getAPost method against expected values.
     *
     * @param {Object} graphqlResponse - The GraphQL response object.
     * @param {Object} expectedResponse - The expected response object to compare against.
     * @returns {Promise<void>}
     */
    async validateGetAPost(graphqlResponse, expectedResponse) {
        await expect(graphqlResponse).toEqual(expectedResponse);
        await this.validateContract(GraphQLZeroGetAPostContract, graphqlResponse);
    }
}

export default new gqlGraphQLZeroPage();
