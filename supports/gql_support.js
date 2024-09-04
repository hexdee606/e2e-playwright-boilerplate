const {request} = require('@playwright/test');

if (!env_url.gqlConf.end_point) {
    throw new Error("GraphQL endpoint is not defined in the environment configuration.");
}

/**
 * GraphQLHelper class for managing GraphQL queries and mutations using Playwright's request API.
 */
class graphql_support {

    /**
     * Sends a GraphQL query to the specified endpoint.
     *
     * @param {string} query - The GraphQL query string.
     * @param {Object} [variables={}] - Optional variables to include in the query.
     * @param {Object} [headers={}] - Optional headers to include in the request.
     * @returns {Promise} - A promise that resolves with the response.
     */
    async sendQuery(query, variables = {}, headers = {}) {
        const body = JSON.stringify({
            query,
            variables
        });

        const context = await request.newContext();
        try {
            return await context.post(env_url.gqlConf.end_point, {
                data: body,
                headers: {
                    ...env_url.gqlConf.headers,
                    ...headers
                }
            });
        } catch (error) {
            console.error("Error sending GraphQL query:", error);
            throw error;
        }
    }

    /**
     * Sends a GraphQL mutation to the specified endpoint.
     *
     * @param {string} mutation - The GraphQL mutation string.
     * @param {Object} [variables={}] - Optional variables to include in the mutation.
     * @param {Object} [headers={}] - Optional headers to include in the request.
     * @returns {Promise} - A promise that resolves with the response.
     */
    async sendMutation(mutation, variables = {}, headers = {}) {
        const body = JSON.stringify({
            query: mutation,
            variables
        });

        const context = await request.newContext();
        try {
            return await context.post(env_url.gqlConf.end_point, {
                data: body,
                headers: {
                    ...env_url.gqlConf.headers,
                    ...headers
                }
            });
        } catch (error) {
            console.error("Error sending GraphQL mutation:", error);
            throw error;
        }
    }
}

module.exports = new graphql_support();
