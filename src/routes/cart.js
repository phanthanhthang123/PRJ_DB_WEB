
const express = require('express');
const router = express.Router();
const cartController = require('../app/controllers/CartController');


router.post('/add',cartController.addToCart);

router.post('/remove', cartController.removeFromCart);

module.exports = router;