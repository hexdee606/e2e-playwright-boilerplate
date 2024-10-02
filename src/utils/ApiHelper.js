import {request} from '@playwright/test';

/**
 * API Helper Class
 *
 * This class provides methods to facilitate sending API requests using Playwright's request context.
 * It allows for configuration of request settings such as timeout and retry options.
 *
 * Author: Dipen Chavan
 * Date: 2024-09-22
 */

// Environment configuration
const {backend} = envConf;

// Validate API URL Configuration
if (!backend.apiUrl) {
    throw new Error('API URL is not defined in the environment configuration.');
}

class ApiHelper {
    constructor() {
        this.setConf = {
            timeout: 60 * 1000,        // Default timeout in milliseconds
            maxRetries: 3,             // Default maximum retries
            ignoreHTTPSErrors: true,   // Default to ignore HTTPS errors
        };
    }

    /**
     * Configure request settings for API requests.
     *
     * @param {Object} options - Configuration options
     * @param {number} [options.timeout] - Timeout in milliseconds (overrides default)
     * @param {number} [options.maxRetries] - Maximum number of retries (overrides default)
     * @param {boolean} [options.ignoreHTTPSErrors] - Whether to ignore HTTPS errors (overrides default)
     */
    async defineConf({timeout, maxRetries, ignoreHTTPSErrors} = {}) {
        if (timeout !== undefined) this.setConf.timeout = timeout;
        if (maxRetries !== undefined) this.setConf.maxRetries = maxRetries;
        if (ignoreHTTPSErrors !== undefined) this.setConf.ignoreHTTPSErrors = ignoreHTTPSErrors;
    }

    /**
     * Log debug information if verbose mode is enabled.
     *
     * @param {string} url - The URL for the API request
     * @param {Object} options - The options passed to the request
     * @param {Object} response - The response received from the server
     */
    async verboseLog(url, options, response) {
        if (verbose) {
            await console.debug('API Request Debug Information:');
            await console.debug('URL:', url);
            await console.debug('Options:', options);
            await console.debug('Response:', JSON.stringify(await response.json(), null, 2));
        }
    }

    /**
     * Generic method to send an API request.
     *
     * @param {string} endpoint - The endpoint for the API request
     * @param {string} method - The HTTP method (GET, POST, PUT, PATCH, DELETE)
     * @param {Object} [body={}] - The body to send with the request (for POST, PUT, PATCH)
     * @param {Object} [headers={}] - Additional headers for the request
     * @returns {Promise<Object>} - The response from the API server
     * @throws {Error} - Throws an error if the request fails
     */
    async sendRequest(endpoint, method, body = {}, headers = {}) {
        const context = await request.newContext();
        const baseUrl = backend.apiUrl.endsWith("/") ? backend.apiUrl.slice(0, -1) : backend.apiUrl;
        const normalizedEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
        const url = `${baseUrl}/${normalizedEndpoint}`;
        const options = {
            method: method,
            data: JSON.stringify(body),
            headers: {
                ...backend.headers.api, ...headers
            },
            timeout: this.setConf.timeout,
            maxRetries: this.setConf.maxRetries,
            ignoreHTTPSErrors: this.setConf.ignoreHTTPSErrors,
        };

        try {
            const response = await context.fetch(url, options);
            await this.verboseLog(url, options, response);
            return await response.json();
        } catch (error) {
            console.error(`Error sending ${method} request to ${url}:`, error);
            throw error;
        }
    }

    /**
     * Send a GET request.
     *
     * @param {string} endpoint - The endpoint for the API request
     * @param {Object} [body={}] - The body to send with the request
     * @param {Object} [headers={}] - Additional headers for the request
     * @returns {Promise<Object>} - The response from the API server
     * @throws {Error} - Throws an error if the request fails
     */
    async sendGetRequest(endpoint, body = {}, headers = {}) {
        return await this.sendRequest(endpoint, 'GET', body, headers);
    }

    /**
     * Send a POST request.
     *
     * @param {string} endpoint - The endpoint for the API request
     * @param {Object} [body={}] - The body to send with the request
     * @param {Object} [headers={}] - Additional headers for the request
     * @returns {Promise<Object>} - The response from the API server
     * @throws {Error} - Throws an error if the request fails
     */
    async sendPostRequest(endpoint, body = {}, headers = {}) {
        return await this.sendRequest(endpoint, 'POST', body, headers);
    }

    /**
     * Send a PUT request.
     *
     * @param {string} endpoint - The endpoint for the API request
     * @param {Object} [body={}] - The body to send with the request
     * @param {Object} [headers={}] - Additional headers for the request
     * @returns {Promise<Object>} - The response from the API server
     * @throws {Error} - Throws an error if the request fails
     */
    async sendPutRequest(endpoint, body = {}, headers = {}) {
        return await this.sendRequest(endpoint, 'PUT', body, headers);
    }

    /**
     * Send a PATCH request.
     *
     * @param {string} endpoint - The endpoint for the API request
     * @param {Object} [body={}] - The body to send with the request
     * @param {Object} [headers={}] - Additional headers for the request
     * @returns {Promise<Object>} - The response from the API server
     * @throws {Error} - Throws an error if the request fails
     */
    async sendPatchRequest(endpoint, body = {}, headers = {}) {
        return await this.sendRequest(endpoint, 'PATCH', body, headers);
    }

    /**
     * Send a DELETE request.
     *
     * @param {string} endpoint - The endpoint for the API request
     * @param {Object} [headers={}] - Additional headers for the request
     * @returns {Promise<Object>} - The response from the API server
     * @throws {Error} - Throws an error if the request fails
     */
    async sendDeleteRequest(endpoint, headers = {}) {
        return await this.sendRequest(endpoint, 'DELETE', {}, headers);
    }
}

module.exports = new ApiHelper();
