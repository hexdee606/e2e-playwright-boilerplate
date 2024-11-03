import {Page, expect} from "@playwright/test";
import {AxeBuilder} from "@axe-core/playwright";

class AccessibilityHelper {
    constructor() {

    }

    /**
     * Logs debug information if verbose mode is enabled.
     *
     * @param {string} action - The action being performed.
     * @param {string} selector - The selector associated with the action.
     * @param {string} message - Additional message for context.
     */
    async verboseLog(action, selector, message = '') {
        if (verbose) {
            const timestamp = new Date().toISOString(); // Get the current timestamp
            const formattedMessage = `[Accessibility Helper] - [${timestamp}] - [${action}] - [${selector}]${message ? ` - ${message}` : ''}`;
            console.debug(formattedMessage);
        }
    }

    /**
     * Checks accessibility of the entire page against specified standards.
     *
     * @param {Page} page - The Playwright page object to analyze.
     * @param {Array<string>} standards - The accessibility standards to check against.
     * @throws {Error} Throws an error if violations are found.
     */
    async checkAccessibility(page, standards = ['wcag2a']) {
        const selector = 'html'; // Scan the whole page
        await this.verboseLog('Checking Accessibility', selector, `Standards: ${standards.join(', ')}`);

        // Ensure full page is loaded
        await page.waitForTimeout(1000); // Adjust as necessary or use a specific selector

        // Analyze with Axe using configured options
        const results = await new AxeBuilder({page})
            .include(selector)
            .withTags(standards)
            .analyze();

        const totalChecks = results.passes.length + results.violations.length + results.inapplicable.length;
        const totalViolations = results.violations.length;

        // Only throw an error if there are violations found
        if (totalViolations > 0) {
            // Construct a JSON object for the violations
            const violationDetails = results.violations.map(v => ({
                id: v.id,
                description: v.description,
                instances: v.nodes.map((node, index) => ({
                    index: index + 1,
                    locator: node.target.join(', ')
                })),
                count: v.nodes.length
            }));

            const violationReport = {
                totalChecks,
                totalViolations,
                violations: violationDetails
            };

            const violationMessage = JSON.stringify(violationReport, null, 2); // Pretty print the JSON

            await this.verboseLog('Accessibility Violations Found', selector, violationMessage);
            throw new Error(`Accessibility violations found:\n${violationMessage}`);
        } else {
            await this.verboseLog('No Accessibility Violations', selector);
        }
    }

    /**
     * Checks accessibility for WCAG 2.0 Level A standards.
     *
     * @param {Page} page - The Playwright page object to analyze.
     * @throws {Error} Throws an error if violations are found.
     */
    async checkWCAG2A(page) {
        return await this.checkAccessibility(page, ['wcag2a']);
    }

    /**
     * Checks accessibility for WCAG 2.0 Level AA standards.
     *
     * @param {Page} page - The Playwright page object to analyze.
     * @throws {Error} Throws an error if violations are found.
     */
    async checkWCAG2AA(page) {
        return await this.checkAccessibility(page, ['wcag2a', 'wcag2aa']);
    }

    /**
     * Checks accessibility for WCAG 2.0 Level AAA standards.
     *
     * @param {Page} page - The Playwright page object to analyze.
     * @throws {Error} Throws an error if violations are found.
     */
    async checkWCAG2AAA(page) {
        return await this.checkAccessibility(page, ['wcag2a', 'wcag2aa', 'wcag2aaa']);
    }

    /**
     * Checks accessibility for WCAG 2.1 Level A standards.
     *
     * @param {Page} page - The Playwright page object to analyze.
     * @throws {Error} Throws an error if violations are found.
     */
    async checkWCAG21A(page) {
        return await this.checkAccessibility(page, ['wcag21a']);
    }

    /**
     * Checks accessibility for WCAG 2.1 Level AA standards.
     *
     * @param {Page} page - The Playwright page object to analyze.
     * @throws {Error} Throws an error if violations are found.
     */
    async checkWCAG21AA(page) {
        return await this.checkAccessibility(page, ['wcag21a', 'wcag21aa']);
    }

    /**
     * Checks accessibility for WCAG 2.2 Level AA standards.
     *
     * @param {Page} page - The Playwright page object to analyze.
     * @throws {Error} Throws an error if violations are found.
     */
    async checkWCAG22AA(page) {
        return await this.checkAccessibility(page, ['wcag22aa']);
    }

    /**
     * Checks accessibility based on common best practices.
     *
     * @param {Page} page - The Playwright page object to analyze.
     * @throws {Error} Throws an error if violations are found.
     */
    async checkBestPractices(page) {
        return await this.checkAccessibility(page, ['best-practice']);
    }

    // Additional methods for other standards can be implemented similarly...
}

module.exports = new AccessibilityHelper();
