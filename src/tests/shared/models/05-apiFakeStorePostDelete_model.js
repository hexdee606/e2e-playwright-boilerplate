/**
 * Model representing the structure of a new user to be created.
 * This object holds all the necessary fields required by the Fake Store API for user creation.
 *
 * @typedef {Object} AddAUserModel
 * @property {string} email - The user's email address.
 * @property {string} username - The user's chosen username.
 * @property {string} password - The user's password.
 * @property {Object} name - The user's full name.
 * @property {string} name.firstname - The user's first name.
 * @property {string} name.lastname - The user's last name.
 * @property {Object} address - The user's address details.
 * @property {string} address.city - The city where the user lives.
 * @property {string} address.street - The street where the user resides.
 * @property {number} address.number - The street number.
 * @property {string} address.zipcode - The postal code of the user's address.
 * @property {Object} address.geolocation - Geolocation coordinates for the user's address.
 * @property {string} address.geolocation.lat - The latitude of the user's address.
 * @property {string} address.geolocation.long - The longitude of the user's address.
 * @property {string} phone - The user's phone number.
 */

let addAUserModel = {
    email: '',
    username: '',
    password: '',
    name: {
        firstname: '',
        lastname: ''
    },
    address: {
        city: '',
        street: '',
        number: 0,
        zipcode: '',
        geolocation: {
            lat: '',
            long: ''
        }
    },
    phone: ''
};

module.exports = {
    addAUserModel
};
