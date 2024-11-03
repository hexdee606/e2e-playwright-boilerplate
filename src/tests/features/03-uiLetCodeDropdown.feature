@suit3
Feature: Automated Drop-Down Interaction with Playwright

  Scenario: Selecting and validating an option from the dropdown list
    Given the user navigates to the LetCode website
    When  the user navigates to the workspace for further actions
    Then  the user selects the "Drop-Down" option from the screen
    When  the user selects "Banana" from the dropdown list
    Then  the user verifies that "Banana" is the selected option in the dropdown

  Scenario: User scans the page for AAA accessibility compliance as per WCAG 2
    When the user analyzes the webpage to identify accessibility issues

