const { request } = require('@playwright/test');

// Check if env_url is correctly defined
if (!env_url || !env_url.apiConf || !env_url.apiConf.end_point) {
    throw new Error("API endpoint is not defined in the configuration.");
}

/**
 * ApiHelper class provides methods for making HTTP requests using Playwright's request API.
 */
class api_support {
    constructor() {
        // No request context is created in the constructor
    }

    /**
     * Sends an HTTP DELETE request to the specified endpoint.
     *
     * @param {string} endpoint - The specific endpoint to send the DELETE request to. Defaults to "/".
     * @param {Object} [headers={}] - Optional headers to include in the request. Defaults to an empty object.
     * @returns {Promise} - A promise that resolves with the response from the API.
     */
    async sendDeleteRequest(endpoint = "/", headers = {}) {
        try {
            const client = await request.newContext(); // Create a new request context
            const baseUrl = env_url.apiConf.end_point.endsWith("/")
                ? env_url.apiConf.end_point.slice(0, -1)
                : env_url.apiConf.end_point;
            const normalizedEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
            const fullUrl = `${baseUrl}/${normalizedEndpoint}`;

            return await client.delete(fullUrl, {
                headers: { ...env_url.apiConf.headers, ...headers }
            });
        } catch (error) {
            console.error(`Error sending DELETE request to ${endpoint}:`, error);
            throw error;
        }
    }

    /**
     * Sends an HTTP GET request to the specified endpoint.
     *
     * @param {string} endpoint - The specific endpoint to send the GET request to. Defaults to "/".
     * @param {Object} [headers={}] - Optional headers to include in the request. Defaults to an empty object.
     * @returns {Promise} - A promise that resolves with the response from the API.
     */
    async sendGetRequest(endpoint = "/", headers = {}) {
        try {
            const client = await request.newContext(); // Create a new request context
            const baseUrl = env_url.apiConf.end_point.endsWith("/")
                ? env_url.apiConf.end_point.slice(0, -1)
                : env_url.apiConf.end_point;
            const normalizedEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
            const fullUrl = `${baseUrl}/${normalizedEndpoint}`;

            return await client.get(fullUrl, {
                headers: { ...env_url.apiConf.headers, ...headers }
            });
        } catch (error) {
            console.error(`Error sending GET request to ${endpoint}:`, error);
            throw error;
        }
    }

    /**
     * Sends an HTTP PATCH request to the specified endpoint.
     *
     * @param {string} endpoint - The specific endpoint to send the PATCH request to. Defaults to "/".
     * @param {Object} [data={}] - Optional data to include in the request body. Defaults to an empty object.
     * @param {Object} [headers={}] - Optional headers to include in the request. Defaults to an empty object.
     * @returns {Promise} - A promise that resolves with the response from the API.
     */
    async sendPatchRequest(endpoint = "/", data = {}, headers = {}) {
        try {
            const client = await request.newContext(); // Create a new request context
            const baseUrl = env_url.apiConf.end_point.endsWith("/")
                ? env_url.apiConf.end_point.slice(0, -1)
                : env_url.apiConf.end_point;
            const normalizedEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
            const fullUrl = `${baseUrl}/${normalizedEndpoint}`;

            return await client.patch(fullUrl, {
                data,
                headers: { ...env_url.apiConf.headers, ...headers }
            });
        } catch (error) {
            console.error(`Error sending PATCH request to ${endpoint}:`, error);
            throw error;
        }
    }

    /**
     * Sends an HTTP POST request to the specified endpoint.
     *
     * @param {string} endpoint - The specific endpoint to send the POST request to. Defaults to "/".
     * @param {Object} data - Data to include in the request body. Must be provided.
     * @param {Object} [headers={}] - Optional headers to include in the request. Defaults to an empty object.
     * @returns {Promise} - A promise that resolves with the response from the API.
     */
    async sendPostRequest(endpoint = "/", data = {}, headers = {}) {
        try {
            const client = await request.newContext(); // Create a new request context
            const baseUrl = env_url.apiConf.end_point.endsWith("/")
                ? env_url.apiConf.end_point.slice(0, -1)
                : env_url.apiConf.end_point;
            const normalizedEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
            const fullUrl = `${baseUrl}/${normalizedEndpoint}`;

            return await client.post(fullUrl, {
                data,
                headers: { ...env_url.apiConf.headers, ...headers }
            });
        } catch (error) {
            console.error(`Error sending POST request to ${endpoint}:`, error);
            throw error;
        }
    }

    /**
     * Sends an HTTP PUT request to the specified endpoint.
     *
     * @param {string} endpoint - The specific endpoint to send the PUT request to. Defaults to "/".
     * @param {Object} [data={}] - Optional data to include in the request body. Defaults to an empty object.
     * @param {Object} [headers={}] - Optional headers to include in the request. Defaults to an empty object.
     * @returns {Promise} - A promise that resolves with the response from the API.
     */
    async sendPutRequest(endpoint = "/", data = {}, headers = {}) {
        try {
            const client = await request.newContext(); // Create a new request context
            const baseUrl = env_url.apiConf.end_point.endsWith("/")
                ? env_url.apiConf.end_point.slice(0, -1)
                : env_url.apiConf.end_point;
            const normalizedEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
            const fullUrl = `${baseUrl}/${normalizedEndpoint}`;

            return await client.put(fullUrl, {
                data,
                headers: { ...env_url.apiConf.headers, ...headers }
            });
        } catch (error) {
            console.error(`Error sending PUT request to ${endpoint}:`, error);
            throw error;
        }
    }
}

module.exports = new api_support();
