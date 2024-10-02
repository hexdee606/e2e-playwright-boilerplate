/**
 * TestData.js
 *
 * This module exports test data objects used throughout the application for testing purposes.
 * It serves as a centralized location for managing and maintaining sample data.
 *
 * Usage:
 * - Import this module to access test data in your tests or other application components.
 *
 * Author: Hexdee606
 * Date: 2024-09-21
 */

module.exports = {
    signup_test_data: {
        title: "Mr",
        Name: "",
        Email: "",
        Password: "Test@1234",
        dateOfBirth: {
            day: "1",
            month: "February",
            year: "1996"
        },
        AddressInformation: {
            firstName: "test",
            lastName: "user",
            company: "test company",
            addressLine1: "test address line one",
            addressLine2: "test address line two",
            state: "Maharashtra",
            city: "Pune",
            zipcode: "411006",
            mobileNumber: "9999999999"
        }
    },
    api_response: {},
    gql_response: {}
};
