const express = require('express');
const router = express.Router();
const pizzas = require('./pizzas');
const toppings = require('./toppings');
const orders  = require('./orders')

router.use('/pizza', pizzas);
router.use('/topping', toppings);
router.use('/orders', orders)

module.exports = router;
