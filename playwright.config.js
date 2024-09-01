// @ts-check
const {defineConfig, devices} = require("@playwright/test");
const {defineBddConfig} = require("playwright-bdd");
// require('./config/global.variables.conf');
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

// Define BDD configuration with all options
const bddConfig = defineBddConfig({
    features: "src/features/**/*.feature", // Path(s) to feature files
    steps: "src/step_definitions/**/*.js", // Path(s) to step definitions
    // outputDir: "features-gen", // Directory to output generated test files
    // featuresRoot: ".", // Base directory for feature files
    // language: "en", // Default language for feature files
    // examplesTitleFormat: "Example #<_index_>", // Title format for Scenario Outline examples
    // quotes: "double", // Quotes style in generated test files
    // tags: "@desktop and not @slow", // Tags expression to filter scenarios
    verbose: true, // Verbose output
    // enrichReporterData: true, // Add special attachments with BDD data
    // statefulPoms: false, // Enable strict guessing of fixtures
});

module.exports = defineConfig({
    // Directory where your tests are located
    testDir: '.features-gen',

    // Run tests in files in parallel
    fullyParallel: true,

    // Fail the build on CI if you accidentally left test.only in the source code
    forbidOnly: !!process.env.CI,

    // Retry on CI only
    retries: process.env.CI ? 2 : 0,

    // Opt out of parallel tests on CI
    workers: process.env.CI ? 1 : undefined,

    // Reporter to use
    reporter: "html",

    // Shared settings for all the projects below
    use: {
        globalFiles: require('./config/global.variables.conf'),
        // Base URL to use in actions like `await page.goto('/')`
        baseURL: env_url.ui,

        // Collect trace when retrying the failed test
        trace: "on-first-retry", // 'on', 'on-first-retry', 'retain-on-failure', 'off'

        // Video recording configuration
        video: "retain-on-failure", // 'on', 'retain-on-failure', 'off'

        // Screenshot configuration
        screenshot: "only-on-failure", // 'on', 'only-on-failure', 'off'

        // Browser launch options
        launchOptions: {
            headless: false, // Run browser in headless mode (default: true)
            slowMo: 0, // Slow down operations by milliseconds (default: 0)
            args: [
                // Browser arguments
                "--no-sandbox", // Disable sandboxing (useful for CI)
                "--disable-setuid-sandbox", // Disable setuid sandbox (useful for CI)
                "--disable-web-security", // Disable web security features
                "--disable-gpu", // Disable GPU hardware acceleration
                "--disable-dev-shm-usage", // Disable /dev/shm usage
                "--disable-infobars", // Disable infobars
                "--start-maximized", // Start browser maximized
                "--incognito", // Launch browser in incognito mode
                // "--headless", // Launch browser in headless mode
                // "--remote-debugging-port=9222", // Port for remote debugging
            ],
            // devtools: false, // Open DevTools when launching the browser (default: false)
            // executablePath: "", // Path to a custom browser executable (default: '')
            timeout: 30000, // Maximum time to wait for browser to start (default: 30000ms)
            // channel: "", // Specify browser channel (e.g., 'chrome', 'msedge') (default: '')
            // proxy: null, // Proxy settings (default: null)
            // dumpio: false, // Whether to dump browser process stdout and stderr (default: false)
        },

        // Browser context options
        contextOptions: {
            // viewport: {width: 1280, height: 720}, // Default viewport size
            // userAgent: "", // User agent string
            ignoreHTTPSErrors: false, // Ignore HTTPS errors (default: false)
            // geolocation: null, // Geolocation settings (default: null)
            // locale: 'en-US', // Locale
            // timezoneId: 'America/New_York', // Timezone ID
            permissions: [
                // Permissions to grant
                // 'geolocation', // Allow geolocation access
                // 'notifications', // Allow notifications
                // 'camera', // Allow camera access
                // 'microphone', // Allow microphone access
                // 'fullscreen', // Allow fullscreen mode
                // 'payment', // Allow payment requests
                // 'background-sync', // Allow background synchronization
                // 'midi', // Allow MIDI access
                // 'push', // Allow push notifications
                // 'storage' // Allow storage access
            ],
            // storageState: null, // Path to a JSON file with storage state (default: null)
            // javaScriptEnabled: true, // Whether to enable JavaScript (default: true)
            // deviceScaleFactor: 1, // Device scale factor (default: 1)
            // isMobile: false, // Whether to emulate a mobile device (default: false)
            // hasTouch: false, // Whether to emulate touch events (default: false)
            // colorScheme: "light", // Emulated color scheme ('light' or 'dark')
            // reducedMotion: "no-preference", // Emulated reduced motion preference ('reduce', 'no-preference')
            // prefersReducedTransparency: 'no-preference', // Emulated reduced transparency preference ('reduce', 'no-preference')
            // prefersReducedData: 'no-preference' // Emulated reduced data preference ('reduce', 'no-preference')
        },

        // HTTP credentials for authentication
        // httpCredentials: null, // HTTP credentials (username and password) (default: null)

        // Proxy settings
        // proxy: {
        //   server: "", // Proxy server address (default: '')
        //   username: "", // Proxy username (optional)
        //   password: "", // Proxy password (optional)
        // },

        // Custom storage state file
        // storageState: null, // Path to a JSON file with storage state (default: null)
    },

    // Projects configuration for running tests across different browsers
    projects: [
        {
            name: "chromium",
            use: {...devices["Desktop Chrome"]},
        },
        // {
        //   name: "firefox",
        //   use: { ...devices["Desktop Firefox"] },
        // },
        // {
        //   name: "webkit",
        //   use: { ...devices["Desktop Safari"] },
        // },
        // Test against mobile viewports
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },
        // Test against branded browsers
        // {
        //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        // },
    ],

    // Run your local dev server before starting the tests
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://127.0.0.1:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
