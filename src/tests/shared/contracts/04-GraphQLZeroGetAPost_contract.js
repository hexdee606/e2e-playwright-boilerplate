import {z} from "zod";

/**
 * Zod schema for validating the structure of the response from the 'getAPost' GraphQL query.
 */
const getAPostContract = z.object({
    post: z.object({
        id: z.string(),
        title: z.string(),
        body: z.string()
    }),
});

// Export the contract for use in validation
module.exports = getAPostContract;
