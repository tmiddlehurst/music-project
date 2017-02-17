var express = require("express");
var router = express.Router();
var bandsController = require('../controllers/bands');
var usersController = require('../controllers/users');

module.exports = router;

// users
router.route('/users')
      .post(usersController.create);

router.route('/users/new')
      .get(usersController.new);

// router.route('/users/:id')
//       .get(usersController.show);      

//bands
router.route('/')
	.get(bandsController.index)
	.post(bandsController.create);

router.get('/new', bandsController.new);

router.route('/:id')
	.get(bandsController.show)
	.put(bandsController.update)
	.delete(bandsController.delete);

router.get('/:id/edit', bandsController.edit);