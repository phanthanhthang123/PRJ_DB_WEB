
const express = require('express');
const router = express.Router();
const cartController = require('../app/controllers/CartController');


router.post('/add',cartController.addToCart);

module.exports = router;