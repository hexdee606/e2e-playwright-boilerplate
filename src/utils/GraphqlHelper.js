import {request} from '@playwright/test';

/**
 * GraphQL Helper Class
 *
 * This class provides methods to facilitate sending GraphQL queries using Playwright's request context.
 * It allows for configuration of request settings such as timeout and retry options.
 *
 * Author: Hexdee606
 * Date: 2024-09-22
 */

// Environment configuration
const {backend} = envConf;

// Validate GraphQL URL Configuration
if (!backend.gqlUrl) {
    throw new Error('GraphQL URL is not defined in the environment configuration.');
}

class GraphqlHelper {
    constructor() {
        this.setConf = {
            timeout: 60 * 1000,        // Default timeout in milliseconds
            maxRetries: 3,             // Default maximum retries
            ignoreHTTPSErrors: true,   // Default to ignore HTTPS errors
        };
    }

    /**
     * Configure request settings for GraphQL requests.
     *
     * @param {Object} options - Configuration options
     * @param {number} [options.timeout] - Timeout in milliseconds
     * @param {number} [options.maxRetries] - Maximum number of retries
     * @param {boolean} [options.ignoreHTTPSErrors] - Whether to ignore HTTPS errors
     */
    async defineConf({timeout, maxRetries, ignoreHTTPSErrors} = {}) {
        if (timeout !== undefined) this.setConf.timeout = timeout;
        if (maxRetries !== undefined) this.setConf.maxRetries = maxRetries;
        if (ignoreHTTPSErrors !== undefined) this.setConf.ignoreHTTPSErrors = ignoreHTTPSErrors;
    }

    /**
     * Log debug information if verbose mode is enabled.
     *
     * @param {string} url - The URL for the GraphQL request
     * @param {Object} options - The options passed to the request
     * @param {Object} response - The response received from the server
     */
    async verboseLog(url, options, response) {
        if (verbose) {
            await console.debug('GraphQL Request Debug Information:');
            await console.debug('URL:', url);
            await console.debug('Options:', options);
            await console.debug('Response:', JSON.stringify(await response.json(), null, 2));
        }
    }

    /**
     * Send a GraphQL query or mutation.
     *
     * @param {string} query - The GraphQL query/mutation string
     * @param {Object} [variables={}] - The body to send with the request
     * @param {Object} [headers={}] - Additional headers for the request
     * @returns {Promise<Object>} - The response from the GraphQL server
     * @throws {Error} - Throws an error if the request fails
     */
    async sendRequest(query, variables = {}, headers = {}) {
        const context = await request.newContext();
        const options = {
            data: JSON.stringify({query, variables}),
            headers: {
                ...backend.headers.gql,
                ...headers
            },
            timeout: this.setConf.timeout,
            maxRetries: this.setConf.maxRetries,
            ignoreHTTPSErrors: this.setConf.ignoreHTTPSErrors,
        };

        try {
            const response = await context.post(backend.gqlUrl, options);
            await this.verboseLog(backend.gqlUrl, options, response); // Log debug info if verbose is enabled
            return await response.json();
        } catch (error) {
            console.error('Error sending GraphQL query:', error);
            throw error;
        }
    }
}

module.exports = new GraphqlHelper();
