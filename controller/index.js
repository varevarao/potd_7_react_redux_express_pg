var express = require('express');
var router = express.Router();

const userController = require('./user');
const productController = require('./product');
const rentalController = require('./rental');

router.use('/user', userController);
router.use('/product', productController);
router.use('/rental', rentalController);

module.exports = router;