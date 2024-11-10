import {z} from 'zod';

/**
 * Schema for a User object.
 * This schema validates the structure of the user data, ensuring the `id` field is a positive integer.
 *
 * @typedef {Object} User
 * @property {number} id - The unique identifier for the user. It must be a positive integer.
 */

// Main User schema
const userSchema = z.object({
    id: z.number().int().min(1),  // ID must be a positive integer
});

module.exports = userSchema;
