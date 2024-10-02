/**
 * JSON handler to filter JSON Data array
 *
 * This module defines the DataFilter class, which provides utility methods
 * for filtering JSON objects based on specified criteria. It supports various
 * filtering conditions, including inclusion, exclusion, and comparisons.
 * The class allows for chaining configuration and returns only the specified
 * keys from the filtered results.
 *
 * Author: Hexdee606
 * Date: 2024-09-22
 *
 * Usage:
 * const { DataFilter, FilterConditions } = require('./dataFilter');
 * const dataFilter = new DataFilter();
 * dataFilter.configure({...});
 * const filteredData = await dataFilter.filter(jsonData);
 */

const _ = require('lodash');

/**
 * Enum-like object for filtering conditions.
 * @enum {string}
 */
const FilterConditions = {
    CONTAINS: 'contains',
    EXACTLY: 'exactly',
    EXCLUDE: 'exclude',
    INCLUDE: 'include',
    GREATER_THAN: 'greater_than',
    LESS_THAN: 'less_than',
    RANGE: 'range',
};

/**
 * A class for filtering JSON objects based on specified criteria.
 */
class DataFilter {
    /**
     * Creates an instance of DataFilter.
     */
    constructor() {
        this.criteria = [];
        this.keysToReturn = [];
    }

    /**
     * Configures the filter with keys to return and criteria for filtering.
     * @param {Object} config - The configuration object.
     * @param {Array<string>} config.keysToReturn - The keys to extract from the data.
     * @param {Array<Object>} config.criteria - Array of criteria objects.
     * @returns {DataFilter} - The current instance for chaining.
     */
    configure({keysToReturn, criteria = []}) {
        this.keysToReturn = keysToReturn;
        criteria.forEach(({condition, key, value}) => {
            this.addCriteria(condition, key, value);
        });
        return this; // Allow chaining
    }

    /**
     * Adds criteria for filtering data.
     * @param {string} condition - The condition type from FilterConditions.
     * @param {string} key - The key to filter on.
     * @param {any} value - The value to filter for.
     * @returns {DataFilter} - The current instance for chaining.
     */
    addCriteria(condition, key, value) {
        this.criteria.push({condition, key, value});
        return this; // Allow chaining
    }

    /**
     * Filters the provided data based on the set criteria and returns the specified keys.
     * @param {Array<Object>} data - The array of JSON objects to filter.
     * @returns {Promise<Array<Object>>} - A promise that resolves to an array of filtered objects with the specified keys.
     */
    async filter(data) {
        return new Promise((resolve, reject) => {
            try {
                const filtered = data
                    .filter(item => this.applyCriteria(item))
                    .map(item => this.extractKeys(item, this.keysToReturn));
                resolve(filtered);
            } catch (error) {
                reject(new Error(`Filtering error: ${error.message}`));
            }
        });
    }

    /**
     * Applies the criteria to the given item.
     * @param {Object} item - The item to evaluate against the criteria.
     * @returns {boolean} - True if the item matches all criteria; otherwise, false.
     */
    applyCriteria(item) {
        return this.criteria.every(({condition, key, value}) => {
            return this.matchCondition(item, key, value, condition);
        });
    }

    /**
     * Matches a condition against an item.
     * @param {Object} item - The item to check.
     * @param {string} key - The key to check in the item.
     * @param {any} value - The value to compare against.
     * @param {string} condition - The condition to match.
     * @returns {boolean} - True if the condition is met; otherwise, false.
     */
    matchCondition(item, key, value, condition) {
        const itemValue = _.get(item, key);
        switch (condition) {
            case FilterConditions.CONTAINS:
                return _.isString(itemValue) && itemValue.includes(value);
            case FilterConditions.EXACTLY:
                return itemValue === value;
            case FilterConditions.EXCLUDE:
                return itemValue !== value;
            case FilterConditions.INCLUDE:
                return itemValue !== undefined;
            case FilterConditions.GREATER_THAN:
                return itemValue > value;
            case FilterConditions.LESS_THAN:
                return itemValue < value;
            case FilterConditions.RANGE:
                return itemValue >= value[0] && itemValue <= value[1];
            default:
                return false;
        }
    }

    /**
     * Extracts specified keys from an item.
     * @param {Object} item - The item to extract keys from.
     * @param {Array<string>} keysToReturn - The keys to extract.
     * @returns {Object} - An object containing the extracted keys.
     */
    extractKeys(item, keysToReturn) {
        const result = {user: {}};
        keysToReturn.forEach(key => {
            const value = _.get(item, key);
            if (value !== undefined) {
                const pathParts = key.split('.');
                const lastKey = pathParts.pop();
                let current = result.user;
                pathParts.forEach(part => {
                    current[part] = current[part] || {};
                    current = current[part];
                });
                current[lastKey] = value;
            }
        });
        return result;
    }
}

// Exporting the DataFilter class and FilterConditions
module.exports = {
    DataFilter,
    FilterConditions,
};

/***
 // Example usage
 const jsonData = [
 {
 "user": {
 "name": "Alice",
 "age": 25,
 "details": {
 "city": "New York",
 "hobbies": ["reading", "swimming"],
 "address": {
 "street": "123 Main St",
 "zip": "10001"
 }
 }
 }
 },
 {
 "user": {
 "name": "Bob",
 "age": 30,
 "details": {
 "city": "Los Angeles",
 "hobbies": ["music", "sports"],
 "address": {
 "street": "456 Elm St",
 "zip": "90001"
 }
 }
 }
 },
 {
 "user": {
 "name": "Charlie",
 "age": 35,
 "details": {
 "city": "New York",
 "hobbies": ["reading", "gaming"],
 "address": {
 "street": "789 Oak St",
 "zip": "10002"
 }
 }
 }
 }
 ];

 // Create an instance of DataFilter
 const dataFilter = new DataFilter();
 // Configuring the filter
 dataFilter.configure({
 keysToReturn: [
 "user.name",
 "user.details.city",
 "user.details.address.zip",
 "user.age"
 ],
 criteria: [
 {condition: FilterConditions.CONTAINS, key: "user.details.city", value: "New York"},
 {condition: FilterConditions.EXCLUDE, key: "user.name", value: "Bob"},
 {condition: FilterConditions.GREATER_THAN, key: "user.age", value: 30}
 ]
 });

 // Using the filter method
 dataFilter.filter(jsonData)
 .then(filteredData => {
 console.log("Filtered Data:", JSON.stringify(filteredData, null, 2));
 })
 .catch(error => {
 console.error("Error:", error);
 });
 */