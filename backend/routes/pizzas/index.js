let express = require('express');
let router = express.Router();
let pizzaController = require('./controller');

/*
 * GET
 */
router.get('/', pizzaController.get);

/*
 * GET
 */
router.get('/:id', pizzaController.get);

/*
 * POST
 */
router.post('/', pizzaController.post);

/*
 * PUT
 */
router.put('/:id', pizzaController.put);

/*
 * DELETE
 */
router.delete('/:id', pizzaController.delete);



module.exports = router;
