const express = require('express');
const router = express.Router();
const rentals = require('../services/rentals');

const ERRORS = {
    CREATE_FAILED: 'Something went wrong while trying to create the rental',
    ACTIVATE_FAILED: 'Could not activate rental',
    CLOSURE_FAILED: 'Could not close rental',
    FETCH_FAILED: 'Something went wrong while trying to fetch the rentals',
    PARAMS_MISSING: 'Required parameters are missing'
}

/**
 * Create a new rental
 * body:
 * {
 *      productId,
 *      qty
 * }
 * 
 * result:
 * 200
 * {
 *      rental
 * }
 * 400/500
 * {
 *      error
 * }
 */
router.post('/create', async function (req, res) {
    const { id: userId } = req.user;
    const { productId, qty: quantity } = req.body;

    const rental = await rentals.createNew({
        userId,
        productId,
        quantity
    });

    if (!rental) {
        res.status(500);
        res.send({ error: ERRORS.CREATE_FAILED });
    } else {
        res.status(200);
        res.send({ rental })
    }
});

/**
 * Activate an exisiting rental
 * 
 * result:
 * 200
 * {
 *      done
 * }
 * 400/500
 * {
 *      error
 * }
 */
router.post('/activate/:id', async function (req, res) {
    const { id: userId } = req.user;
    const { id } = req.path;

    const done = await rentals.activateRental({
        userId,
        id
    });

    if (!done) {
        res.status(500);
        res.send({ error: ERRORS.ACTIVATE_FAILED });
    } else {
        res.status(200);
        res.send({ done })
    }
});

/**
 * Close an exisiting rental
 * 
 * result:
 * 200
 * {
 *      done
 * }
 * 400/500
 * {
 *      error
 * }
 */
router.post('/close/:id', async function (req, res) {
    const { id: userId } = req.user;
    const { id } = req.path;

    const done = await rentals.closeRental({
        userId,
        id
    });

    if (!done) {
        res.status(500);
        res.send({ error: ERRORS.CLOSURE_FAILED });
    } else {
        res.status(200);
        res.send({ done })
    }
});

/**
 * Get a list of all rentals for the logged in user
 * 
 * result:
 * 200
 * {
 *      rentals
 * }
 * 400/500
 * {
 *      error
 * }
 */
router.get('/current', async function (req, res) {
    const { id: userId } = req.user;

    const rentalList = await rentals.forUser(userId);

    if (!rentalList) {
        res.status(500);
        res.send({ error: ERRORS.FETCH_FAILED });
    } else {
        res.status(200);
        res.send({ rentals: rentalList })
    }
});

/**
 * Get a list of all rentals for the provided product ID
 * 
 * result:
 * 200
 * {
 *      rentals
 * }
 * 400/500
 * {
 *      error
 * }
 */
router.get('/product/:id', async function (req, res) {
    const { id: productId } = req.path;

    const rentalList = await rentals.forProduct(productId);

    if (!rentalList) {
        res.status(500);
        res.send({ error: ERRORS.FETCH_FAILED });
    } else {
        res.status(200);
        res.send({ rentals: rentalList })
    }
});

module.exports = router;