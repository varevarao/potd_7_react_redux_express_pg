const express = require('express');
const router = express.Router();
const products = require('../services/products');

const ERRORS = {
    CREATE_FAILED: 'Something went wrong while trying to create the product listing',
    FETCH_FAILED: 'Something went wrong while trying to fetch the product catalogue',
    FETCH_NOT_FOUND: 'Could not find the requested product',
    PARAMS_MISSING: 'Required parameters are missing'
}

/**
 * Create a new product listing
 * body:
 * {
 *      title,
 *      desc,
 *      qty
 * }
 * 
 * result:
 * 200
 * {
 *      product
 * }
 * 400/500
 * {
 *      error
 * }
 */
router.post('/create', async function (req, res) {
    const { id: userId } = req.user;
    const { title, desc: description, qty: quantity } = req.body;

    const product = await products.createNew({ userId, title, description, quantity });
    if (!product) {
        res.status(500);
        res.send({ error: ERRORS.CREATE_FAILED })
    } else {
        res.status(200);
        res.send({ product });
    }
});

/**
 * Get a single product by ID
 * 
 * result:
 * 200
 * {
 *      product
 * }
 * 400/500
 * {
 *      error
 * }
 */
router.get('/:id', async function (req, res) {
    const { id } = req.params;

    const product = await products.find(id);
    if (!product) {
        res.status(400);
        res.send({ error: ERRORS.FETCH_NOT_FOUND })
    } else {
        res.status(200);
        res.send({ product });
    }
});

/**
 * Get a list of all products
 * 
 * result:
 * 200
 * {
 *      products
 * }
 * 400/500
 * {
 *      error
 * }
 */
router.get('/', async function (req, res) {
    const productList = await products.all();
    if (!productList) {
        res.status(500);
        res.send({ error: ERRORS.FETCH_FAILED })
    } else {
        res.status(200);
        res.send({ products: productList });
    }
});

module.exports = router;