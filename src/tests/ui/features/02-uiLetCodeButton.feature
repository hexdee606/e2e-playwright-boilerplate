Feature: User practices automated buttons using Playwright

  Background:
    Given the user navigates to the LetCode website
    When  the user navigates to the workspace for further actions
    Then  the user selects the "Click" option from the screen

  @suit1
  Scenario: User validates the functionality of the "Go to Home" button
    When the user clicks the "Goto Home" button
    Then the user should see that they are on the home page of the web application
    And  the user navigates back to the previous page using the browser's back button

  @suit2
  Scenario: The user performs a long click and validates the changes
    When the user long presses the "Button Hold!" button
    Then the user validates that the button text has changed to "Button has been long pressed"
