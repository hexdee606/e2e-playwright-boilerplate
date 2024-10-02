/**
 * env.conf.js
 *
 * Configuration module for environment-specific settings.
 * This module exports an object containing the environment (defaulting to 'int')
 * and configuration details for various environments (integration, staging, and production).
 *
 * Each environment configuration includes:
 * - frontend: Base URL for the frontend application
 * - backend:
 *   - api: Base URL for the REST API
 *   - gql: Base URL for the GraphQL API
 *
 * Usage:
 * - Access the current environment's configuration using `currentConfig`.
 *
 * Author: Hexdee606
 * Date: 2024-09-21
 */

const envConf = {
    env: process.env.E2E || 'int',
    configs: {
        'int': {
            frontend: {
                url: 'https://automationexercise.com' // Main URL for the frontend
            },
            backend: {
                api: {
                    url: 'https://reqres.in/api' // Base URL for REST API
                },
                gql: {
                    url: 'https://graphqlzero.almansi.me/api' // Base URL for GraphQL API
                }
            }
        },

        // Additional environments can be added here
    }
};

// Example of how to access the configuration based on the current environment
// const currentConfig = envConf.configs[envConf.env];

module.exports = envConf;
