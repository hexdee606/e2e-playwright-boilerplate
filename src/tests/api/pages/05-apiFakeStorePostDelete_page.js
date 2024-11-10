import {expect} from "@playwright/test";
import {addAUserModel} from "../../shared/models/05-apiFakeStorePostDelete_model";

/**
 * Class representing interactions with the Fake Store API.
 * This class contains methods for creating a user, validating API responses against a contract, and more.
 */
class apiFakeStorePostDelete {
    constructor() {
    }

    /**
     * Sends a POST request to create a new user via the Fake Store API.
     * It populates the `addAUserModel` with test data and sends it as the request body.
     *
     * @returns {Promise<Object>} The response from the API after creating a user.
     * @throws {Error} Throws an error if the API request fails.
     */
    async addAUser() {
        // Populate the model with data from TestData (assumed to be set elsewhere)
        addAUserModel.name = {
            firstname: TestData.addAUserTestData.name.firstname,
            lastname: TestData.addAUserTestData.name.lastname,
        };

        addAUserModel.address = {
            city: TestData.addAUserTestData.address.city,
            street: TestData.addAUserTestData.address.street,
            number: TestData.addAUserTestData.address.number,
            zipcode: TestData.addAUserTestData.address.zipcode,
            geolocation: {
                lat: TestData.addAUserTestData.address.geolocation.lat,
                long: TestData.addAUserTestData.address.geolocation.long,
            },
        };

        // Send the POST request and return the response
        return await ApiHelper.sendPostRequest("/users", addAUserModel);
    }

    /**
     * Validates an API response against a given contract schema.
     * This method uses the Zod library to perform schema validation and expects the response to conform to the contract.
     *
     * @param {Object} contract - The Zod schema to validate the API response against.
     * @param {Object} apiResponse - The actual API response object that needs validation.
     * @returns {Promise<void>} Resolves if validation is successful, otherwise throws an error.
     * @throws {Error} Throws an error if validation fails.
     */
    async validateContract(contract, apiResponse) {
        // Validate the response against the contract schema
        const validationResult = await contract.safeParse(apiResponse);

        // If validation fails, log the errors and throw an exception
        if (!validationResult.success) {
            console.error('Validation errors:', validationResult.error.errors);
            throw new Error('Contract validation failed');
        }

        // Assert that the validation is successful
        await expect(validationResult.success).toBe(true);
    }
}

// Export an instance of the class for use in other modules
export default new apiFakeStorePostDelete();
