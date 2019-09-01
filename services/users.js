const users = require('../model/users');
const products = require('../model/products');
const rentals = require('../model/rentals');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const BCRYPT_SALT_ROUNDS = 5;

const validateUserGetToken = async (email, password) => {
    const existing = await users.fetchEmail(email);
    if (!!existing) {
        const { id, email, password: hashed } = existing;
        const valid = bcrypt.compare(password, hashed);

        if (valid) {
            return jwt.sign({ id, email }, (process.env.JWT_SECRET || 'd3f@u1t%2053cr3t'));
        } else {
            return null;
        }
    } else {
        return null;
    }
}

module.exports = {
    exists: async email => {
        const existing = await users.fetchEmail(email);
        return !!existing;
    },

    generateToken: async (email, password) => {
        return await validateUserGetToken(email, password)
    },

    createNew: async metaData => {
        const { email, password } = metaData;

        // Hash the password
        const hashed = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

        if (hashed) {
            const done = await users.insert({
                ...metaData,
                password: hashed
            })

            if (done) {
                return await validateUserGetToken(email, password);
            } else {
                return null;
            }
        } else {
            return null;
        }
    },

    getProfile: async id => {
        const existing = await users.fetchID(id);

        if (!!existing) {
            const { email, firstName, lastName } = existing;

            // Get the linked data
            const userProducts = await products.fetchForUser(id);
            const userRentals = await rentals.fetchForUser(id);

            const profile = {
                email,
                firstName,
                lastName,
                products: userProducts || [],
                rentals: userRentals || []
            }
        } else {
            return null;
        }
    }
}