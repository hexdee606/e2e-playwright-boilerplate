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
                'Accept': 'application/json'
                // Add other API-specific headers here
            },
            gql: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                // Add other GraphQL-specific headers here
            }
        }
    }
};

// Additional global variables using path.resolve for absolute paths
global.testData = require(resolve(__dirname, '../src/data/testData')); // Common test data for the application
global.uiTextData = require(resolve(__dirname, '../src/data/uiTextData')); // UI text data for validation

// Customised helpers/utils global import for use
global.ApiHelper = require('../src/utils/ApiHelper'); // Importing the ApiHelper utility to manage API requests globally
global.GraphqlHelper = require('../src/utils/GraphqlHelper'); // Importing the GraphqlHelper utility to manage GraphQL requests globally

// Additional global variables
global.verbose = false; // Set to true to enable verbose logging for detailed output during execution
