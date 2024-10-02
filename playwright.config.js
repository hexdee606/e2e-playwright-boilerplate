//@ts-check

/**
 * Playwright Configuration File
 *
 * This configuration file sets up the Playwright testing framework with various options
 * for running end-to-end tests. It includes project settings, reporter configurations,
 * and global timeouts to ensure efficient and organized test execution.
 *
 * Author: Dipen Chavan
 * Created On: 2024-09-21
 * Version: 1.0.0
 */

import {resolve} from 'path';                                               // Import path resolver
import {platform, arch} from 'os';                                          // Import OS information
import {defineConfig} from '@playwright/test';                              // Import Playwright config function
import {defineBddConfig} from 'playwright-bdd';                             // Import BDD config function
import './config/global.conf';                                              // Load global configuration settings

// Define BDD configuration for feature files and step definitions
defineBddConfig({
    features: resolve(__dirname, './src/tests/features/**/*.feature'),      // Path to feature files
    steps: resolve(__dirname, './src/tests/step_definitions/**/*_steps.js'),// Path to step definitions
    statefulPoms: true,                                                     // Enable stateful POMs (Page Object Models)
    outputDir: resolve(__dirname, './src/features-gen'),                    // Output directory for generated files
    verbose: verbose                                                        // Enable verbose logging for more detailed output during execution
});

// Exporting Playwright configuration using the defineConfig function
module.exports = defineConfig({
    // General configuration settings for the test suite
    name: "End-to-End Testing",                                             // Descriptive name for the test suite
    fullyParallel: true,                                                    // Set to true to enable parallel execution of tests
    timeout: 5 * 60 * 1000,                                                 // Timeout for individual tests in milliseconds (5 minutes)
    globalTimeout: 5 * 60 * 1000,                                           // Global timeout for all tests in milliseconds (5 minutes)
    outputDir: resolve(__dirname, "./reports/test-results"),                // Directory for storing test results

    // Metadata providing additional information about the test suite
    metadata: {
        createdOn: new Date().toISOString(),                                // Timestamp of when the configuration was created
        version: "1.0.0",                                                   // Version of the test suite configuration
    },

    // Test execution settings
    reportSlowTests: null,                                                  // Set to true to report tests that exceed a certain duration
    retries: 1,                                                             // Number of retries for failed tests
    respectGitIgnore: true,                                                 // Respect .gitignore files when running tests
    testDir: resolve(__dirname, './src/features-gen'),                      // Directory containing test files
    workers: 4,                                                             // Number of parallel workers to run tests

    // Configuration options for browser context
    use: {
        headless: false,                                                    // Run tests with a UI (set to true for headless)
        acceptDownloads: true,                                              // Allow downloads during tests
        actionTimeout: 2 * 60 * 1000,                                       // Timeout for actions (e.g., clicks, fills) in milliseconds
        browserName: 'chromium',                                            // Specify the browser to use for tests
        bypassCSP: true,                                                    // Bypass Content Security Policy (CSP)
        navigationTimeout: 60 * 60 * 1000,                                  // Global timeout for navigation actions in milliseconds

        // Launch options for browser instances
        launchOptions: {
            slowMo: 2 * 1000,                                               // Slow down operations by 1000 milliseconds for easier debugging
            downloadsPath: resolve(__dirname, './src/downloads'),           // Set the path for downloaded files
            timeout: 5 * 60 * 1000,                                         // Set a timeout of 5 minutes for actions (in milliseconds)
            chromiumSandbox: false,                                         // Disable the Chromium sandbox (use with caution, typically in CI environments)
            args: [
                '--start-maximized',                                        // Start the browser maximized
                '--disable-infobars',                                       // Disable info bars
                '--disable-popup-blocking',                                 // Disable popup blocking
                '--no-sandbox',                                             // Bypass OS security model (useful in CI environments)
                '--disable-dev-shm-usage',                                  // Overcome limited resource problems
                '--disable-extensions',                                     // Disable extensions
                '--incognito',                                              // Open in incognito mode
                '--enable-automation',                                      // Enable automation features
                '--disable-gpu',                                            // Disable GPU hardware acceleration
                '--allow-file-access-from-files',                           // Allow file access from local files
                '--enable-logging',                                         // Enable logging
                '--v=1',                                                    // Set verbosity level (1-3)
            ],
        },

        // Settings for capturing screenshots, videos, and traces
        screenshot: 'only-on-failure',                                      // Capture screenshots only on failure
        video: 'on-first-retry',                                            // Record video on the first retry
        trace: 'on-first-retry',                                            // Capture trace on the first retry
        viewport: null,                                                     // Use the default viewport size
        baseURL: envConf.frontend.url,                                      // Base URL for the frontend application
    },

    // Project configurations for different test suites with specific tags
    projects: [{
        name: 'Suit 1',                                                     // Name of the project suit
        grep: /@suit1/,                                                     // Tag to filter tests for this suit
        fullyParallel: false,                                               // Set to true to enable parallel execution of tests
    }, {
        name: 'Suit 2',                                                     // Name of the project suit
        grep: /@suit2/,                                                     // Tag to filter tests for this suit
        fullyParallel: false,                                               // Set to true to enable parallel execution of tests
    }, {
        name: 'Suit 3',                                                     // Name of the project suit
        grep: /@suit3/,                                                     // Tag to filter tests for this suit
        fullyParallel: false,                                               // Set to true to enable parallel execution of tests
    }, {
        name: 'Suit 4',                                                     // Name of the project suit
        grep: /@suit4/,                                                     // Tag to filter tests for this suit
        fullyParallel: false,                                               // Set to true to enable parallel execution of tests
    },],

    // Reporter settings for test results output
    reporter: [["list", {printSteps: true}],                                // Console output format with step printing
        ["allure-playwright", {
            details: true,                                                  // Disable detailed logging in Allure reports
            suiteTitle: true,                                               // Enable suite title in Allure reports
            resultsDir: resolve(__dirname, "./reports/allure-results"),     // Directory for Allure results
            outputFolder: resolve(__dirname, "./reports/allure-results"),   // Output folder for Allure reports
            environmentInfo: {
                Framework: "Playwright",                                    // Framework used for testing
                OS: platform(),                                             // Operating system of the test execution environment
                Architecture: arch(),                                       // Architecture of the test execution environment
                Node_Version: process.version,                              // Node.js version being used
            },
        }],],
});
