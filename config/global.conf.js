/**
 * global.conf.js
 *
 * This module sets global configuration variables and paths for the Node.js application.
 * It includes URLs for frontend and backend services, common file paths, shared variables,
 * and HTTP headers for REST API and GraphQL requests.
 *
 * Usage:
 * - Access global.envConf to retrieve configuration details and common variables across the application.
 *
 * Environment Variables:
 * - E2E: Specifies the environment (e.g., 'int', 'staging', 'production').
 * - GQL_TOKEN: Optional authorization token for GraphQL requests.
 *
 * Common Variables:
 * - FILE_PATH: Path to common resources or files used throughout the application.
 *
 * Author: Hexdee606
 * Date: 2024-09-21
 */

import {resolve} from 'path'; // Importing path module
import {env, configs} from './env.conf';

global.envConf = {
    frontend: {
        url: configs[env].frontend.url // Accessing the frontend URL
    },
    backend: {
        apiUrl: configs[env].backend.api.url, // Accessing the backend API URL
        gqlUrl: configs[env].backend.gql.url, // Accessing the GraphQL URL
        headers: {
            api: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Add other API-specific headers here
                // Authorization: '',
                // serviceConfig: {}
            },
            gql: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Add other GraphQL-specific headers here
                // Authorization: '',
                // serviceConfig: {}
            }
        }
    }
};

// Additional global variables using path.resolve for absolute paths
global.TestData = require('../src/data/TestData'); // Common test data for the application
global.AssertiveStrings = require('../src/data/AssertiveStrings'); // UI text data for validation

// Customised helpers/utils global import for use
global.ApiHelper = require('../src/utils/ApiHelper'); // Importing the ApiHelper utility to manage API requests globally
global.GraphqlHelper = require('../src/utils/GraphqlHelper'); // Importing the GraphqlHelper utility to manage GraphQL requests globally
global.JsonHelper = require('../src/utils/JsonHelper'); // Importing the JsonHelper utility to handle JSON filtering globally
global.PlaywrightActions = require('../src/utils/PlaywrightActions'); // Importing the PlaywrightActions utility to perform Playwright-specific actions globally
global.BrowserStorageHelper = require('../src/utils/BrowserStorageHelper'); // Importing the BrowserStorageHelper utility to manage browser storage globally
global.CommonFunctions = require('../src/utils/CommonFunctions'); // Importing the CommonFunctions utility for shared functions across tests


// Additional global variables
global.verbose = true; // Set to true to enable verbose logging for detailed output during execution {works only on customised method created.}
