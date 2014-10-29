var express = require('express');
var router = express.Router();

var scoreModel = require('../model/scores');

/* ROUTES */
router.post('/', createScore);
router.put('/:scoreId/basket', scoreBasket);
router.put('/:scoreId/set', setScore);
router.get('/:scoreId', getScore);
router.delete('/:scoreId', delScore);
router.get('/', getAll);
/* END ROUTES */

/* PARAMS */
router.param('scoreId', checkScoreExists);
/* END PARAMS */

function createScore(req, res) {
  var score = scoreModel.create();
	res.json(score.toJSON());
}

function scoreBasket(req, res) {
	var team = req.body.team;
	var points = req.body.points;
	var score = req.score;

	var newScore = score.scoreOneBasket(team, points);
	res.json(newScore);
}

function setScore(req, res) {
	var team = req.body.team;
	var points = req.body.points;
	var score = req.score;

	var newScore = score.setScoreTeam(team, points);
	res.json(newScore);
}


function delScore(req, res) {

	scoreModel.del(req.params.scoreId);
	res.send('scored ' + req.params.scoreId + ' removed.');
}

function getScore(req, res) {
	res.json(req.score);
}

function getAll(req, res) {
	res.json(scoreModel.getAll());
}

function checkScoreExists (req, res, next, scoreId) {
	var score = scoreModel.get(scoreId);
	if (score) {
		req.score = score;
		next();
	} else {
		next(new Error(scoreId + ' not exists'));
	}
}

module.exports = router;
