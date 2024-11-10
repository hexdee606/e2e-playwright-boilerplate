@suit4
Feature: POST and DELETE operations for the Fake Store API

  Scenario: Create a new user using the Fake Store API
    Given the user sends a request to create a new user via the Fake Store API
    When the user validates the user creation response against the API contract
    Then the user verifies the response contains the correct details and stores the user ID for future use