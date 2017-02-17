var express = require("express");
var router = express.Router();
var bandsController = require('../controllers/bands');
var usersController = require('../controllers/users');
var sessionsController = require('../controllers/sessions');

module.exports = router;

// sessions
router.route('/sessions')
      .post(sessionsController.create)
      .delete(sessionsController.delete);

router.route('/sessions/new')
      .get(sessionsController.new);

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