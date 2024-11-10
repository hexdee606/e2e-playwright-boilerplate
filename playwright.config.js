// @ts-check
/**
 * @fileOverview Playwright Test Configuration
 * @version 1.0.0
 * @author hexdee606
 * @description This configuration file sets up the Playwright testing framework, defining various options such as timeouts, reporters, and project settings.
 */

import {defineConfig} from "@playwright/test";
import {resolve} from "path"
import {platform, arch} from "os"
import "./resources/config/globalEnv.config";
import {defineBddConfig} from "playwright-bdd"

let timeouts = {
    expect_timeout: 2 * 60 * 1000, // set the expect timeout (2 minutes)
    action_timeout: 5 * 1000, // Set a timeout for actions (5 seconds)
    navigation_timeout: 60 * 1000, // Set a maximum timeout for navigation (1 minute)
    slowMo: 2 * 1000 // Slow down actions by this amount (2 seconds)
};

defineBddConfig({
    features: resolve(__dirname, './src/tests/**/features/**/*.feature'),      // Path to feature files
    steps: resolve(__dirname, './src/tests/**/step_definitions/**/*_steps.js'),// Path to step definitions
    statefulPoms: true,                                                     // Enable stateful POMs (Page Object Models)
    outputDir: resolve(__dirname, './src/features-gen'),                    // Output directory for generated files
    verbose: verbose
});

export default defineConfig({
    expect: {
        timeout: timeouts.expect_timeout // Use the timeout from the timeouts object
    },
    workers: 4, // Number of concurrent workers to run tests
    retries: 0, // Number of times to retry failed tests
    reportSlowTests: null, // Configuration for reporting slow tests (null disables this feature)
    reporter: [
        ["list", {printSteps: true}], // Use a list reporter that prints test steps
        ["allure-playwright", {                                             // Allure reporter settings
            details: true,                                                  // Enable detailed logging
            suiteTitle: true,                                               // Enable suite title in reports
            resultsDir: resolve(__dirname, "./resources/test-results/allure-results"),    // Directory for Allure results
            outputFolder: resolve(__dirname, "./resources/test-results/allure-results"),  // Output folder for Allure reports
            environmentInfo: {
                Framework: "Playwright",                                    // Framework used for testing
                OS: platform(),                                             // Operating system of the test execution environment
                Architecture: arch(),                                       // Architecture of the test execution environment
                Node_Version: process.version,                              // Node.js version being used
            },
        }]
    ],
    testDir: "./src/features-gen", // Directory where test files are located
    use: {
        browserName: "chromium", // The browser to run tests on, can be "firefox" or "webkit" as well
        defaultBrowserType: "chromium", // Default browser type for tests
        headless: true, // Default headless mode, modify if needed
        baseURL: envConf.frontend.url, // Base URL for tests
        trace: "retain-on-failure", // Retain trace files only for tests that fail
        video: "retain-on-failure", // Keep video recordings only for tests that fail
        screenshot: "only-on-failure", // Capture screenshots only for tests that fail
        actionTimeout: timeouts.action_timeout, // Set a timeout for actions
        navigationTimeout: timeouts.navigation_timeout, // Set a maximum timeout for navigation
        launchOptions: {
            downloadsPath: "./resources/downloads", // Path to store downloaded files
            chromiumSandbox: false, // Disable the Chromium sandbox (use with caution)
            args: [
                '--start-maximized',
                '--disable-infobars',
                '--disable-popup-blocking',
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--disable-extensions',
                '--incognito',
                '--enable-automation',
                '--disable-gpu',
                '--allow-file-access-from-files',
                '--enable-logging',
                '--v=1',
            ],
            slowMo: timeouts.slowMo, // Slow down actions by this amount
        },
        contextOptions: {
            permissions: ["storage-access"],
            viewport: {width: 1920, height: 1080} // Set to null for full-screen mode; default is {width: 1920, height: 1080} for standard testing
        },
    },
    projects: [
        {
            name: "suit1",
            grep: /@suit1/,
            outputDir: "./resources/test-results/suit1",
            fullyParallel: false,
        },
        {
            name: "suit2",
            grep: /@suit2/,
            outputDir: "./resources/test-results/suit2",
            fullyParallel: false,
        },
        {
            name: "suit3",
            grep: /@suit3/,
            outputDir: "./resources/test-results/suit3",
            fullyParallel: false,
        },
        {
            name: "suit4",
            grep: /@suit4/,
            outputDir: "./resources/test-results/suit4",
            fullyParallel: false,
        }
    ],
});
