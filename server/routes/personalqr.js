var express = require('express');
var router = express.Router();

var userModel = require('../model/users');
//usermodel contendra el export de users, que es el creat, get, del, delall


/* ROUTES */
router.post('/', createUser);//metodo asociado a la ruta introducida
router.put('/:userId/basket', userBasket);
router.put('/:userId/set', setScore);
router.get('/:userId', getUser);
router.delete('/:userId', delUSer);
router.get('/', getAll);
/* END ROUTES */

/* PARAMS  */
//router.param('userId', checkScoreExists);
/* END PARAMS */

function createUser(req, res) {
  var user = userModel.create();
	res.json(user.toJSON());
}

function userBasket(req, res) {
	var team = req.body.team;
	var points = req.body.points;
	var user = req.user;

	var newScore = user.userOneBasket(team, points);
	res.json(newScore);
}

function setScore(req, res) {
	var team = req.body.team;
	var points = req.body.points;
	var user = req.user;

	var newScore = user.setScoreTeam(team, points);
	res.json(newScore);
}


function delUSer(req, res) {
	userModel.del(req.params.userId);
  //req.params.userId parametro introducido en la URL
	res.send('User ' + req.params.userId + ' removed.');
}

function getUser(req, res) {
	res.json(userModel.get(req.param('userId')));
  //req.param('userId') contiene el dato que le hemos puesto entre las comillas
}

function getAll(req, res) {
	res.json(userModel.getAll());
}

/*function checkScoreExists (req, res, next, scoreId) {
	var score = scoreModel.get(scoreId);
	if (score) {
		req.score = score;
		next();
	} else {
		next(new Error(userId + ' not exists'));
	}
}*/

module.exports = router;
