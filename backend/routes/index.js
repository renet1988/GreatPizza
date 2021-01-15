const express = require('express');
const router = express.Router();
const pizzas = require('./pizzas');
const toppings = require('./toppings');

router.use('/pizza', pizzas);
router.use('/topping', toppings);

module.exports = router;
