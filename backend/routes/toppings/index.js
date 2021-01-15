let express = require('express');
let router = express.Router();
let toppingController = require('./controller');

/*
 * GET
 */
router.get('/', toppingController.get);

/*
 * GET
 */
router.get('/:id', toppingController.get);

/*
 * POST
 */
router.post('/', toppingController.post);

/*
 * PUT
 */
router.put('/:id', toppingController.put);

/*
 * DELETE
 */
router.delete('/:id', toppingController.delete);



module.exports = router;
