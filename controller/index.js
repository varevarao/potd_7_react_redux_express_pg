var express = require('express');
var router = express.Router();

const userController = require('./user');

router.use('/user', userController);

module.exports = router;