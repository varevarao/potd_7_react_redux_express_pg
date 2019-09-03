const express = require('express');
const router = express.Router();
const users = require('../services/users');

const ERRORS = {
    REGISTER_EMAIL_EXISTS: 'Sorry, this email is already registered',
    REGISTER_INSERT_FAILED: 'Something went wrong while creating the user',
    LOGIN_INVALID_CREDS: 'Invalid credentials, or user not found',
    PROFILE_NOT_FOUND: 'Could not find the user profile',
    PARAMS_MISSING: 'Required parameters are missing'
}

/**
 * Register a new user
 * body:
 * {
 *      email,
 *      fName,
 *      lName,
 *      password
 * }
 * 
 * result:
 * 200
 * {
 *      token
 * }
 * 400/500
 * {
 *      error
 * }
 */
router.post('/register', async function (req, res) {
    console.log('Incoming body', JSON.stringify(req.body));
    const { email, fName: firstName, lName: lastName, password } = req.body;

    // Check if the email is already registered
    const existing = await users.exists(email);
    if (existing) {
        res.status(400);
        res.send({ error: ERRORS.REGISTER_EMAIL_EXISTS })
    } else {
        // All good, create the user
        const token = await users.createNew({
            firstName,
            lastName,
            email,
            password
        });

        if (!token) {
            res.status(500);
            res.send({ error: ERRORS.REGISTER_INSERT_FAILED });
        } else {
            res.status(200);
            res.send({ token });
        }
    }
});

/**
 * Validate user credentials, and return a JWT token if necessary
 * body:
 * {
 *      email,
 *      password
 * }
 * 
 * result:
 * 200
 * {
 *      token
 * }
 * 400/500
 * {
 *      error
 * }
 */
router.post('/login', async function (req, res) {
    const { email, password } = req.body;

    // Check if the email is already registered
    const token = await users.generateToken(email, password);
    if (!token) {
        res.status(400);
        res.send({ error: ERRORS.LOGIN_INVALID_CREDS })
    } else {
        res.status(200);
        res.send({ token });
    }
});

/**
 * Gets the user profile for the logged in user
 *
 * result:
 * 200
 * {
 *      user
 * }
 * 400/500
 * {
 *      error
 * }
 */
router.get('/profile', async function (req, res) {
    const { id } = req.user;

    // Check if the email is already registered
    const user = await users.getProfile(id);
    if (!user) {
        res.status(400);
        res.send({ error: ERRORS.PROFILE_NOT_FOUND })
    } else {
        res.status(200);
        res.send({ user });
    }
});

module.exports = router;