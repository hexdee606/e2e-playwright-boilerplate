@suit1
Feature: User practices automated input box using Playwright

  Background:
    Given the user navigates to the LetCode website
    When  the user navigates to the workspace for further actions
    Then  the user selects the "Edit" option from the screen

  Scenario: User enters the full name and validates the input
    When the user enters their full name
    Then the user should validate that the entered full name is correct

  Scenario: User validates that the input box is read-only
    When the user checks the read-only status of the input text box
