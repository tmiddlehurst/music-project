var express = require("express");
var router = express.Router();
var bandsController = require('../controllers/bands');

module.exports = router;

router.route('/')
	.get(bandsController.index)
	.post(bandsController.create);

router.get('/new', bandsController.new);

router.route('/:id')
	.get(bandsController.show)
	.put(bandsController.update)
	.delete(bandsController.delete);

router.get('/:id/edit', bandsController.edit);