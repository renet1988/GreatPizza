let express = require('express');
let router = express.Router();
let orderController = require('./controller');

/*
 * GET
 */
router.get('/', orderController.get);

/*
 * GET
 */
router.get('/:id', orderController.get);

/*
 * POST
 */
router.post('/', orderController.post);

/*
 * PUT
 */
router.put('/:id', orderController.put);

/*
 * DELETE
 */
router.delete('/:id', orderController.delete);



module.exports = router;
