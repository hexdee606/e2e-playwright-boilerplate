@suit2
Feature: REST API GET, POST, and DELETE Operations

  Scenario: GET user list
    Given the user fetch the user list of page 2
    Then  the user validates the response received for page 2


  Scenario Outline: Create user
    Given the user creates a new user with name "<name>" and job "<job>"
    Then the user validates the response contains name "<name>" and job "<job>"
    Examples:
      | name     | job    |
      | morpheus | leader |