var jwtSecret = require('../util/config').jwtSecret;
var debug = require('debug')('social-scoreboard-sec');
var jwt = require('jsonwebtoken');
var daoUser = require('../dao/dao_user');
var daoArticle = require('../dao/dao_article');
/**
 * Check if the token user exists, in other case FORBIDDEN
 */
function ensureAuthenticated(req, res, next) {


	var reqAuth = req.headers.authorization;

	if (!reqAuth) {
		console.log('No authorization header found');
		res.sendStatus(401); // Unauthorized
		return;
	}

	var token = reqAuth.replace(/^\s*Bearer\s*/, '');


	if (!token) {
		console.log('No authorization token found');
		res.sendStatus(401); // Unauthorized
		return;
	}


	jwt.verify(token, jwtSecret, function(err, decode) {

		if (err) {
			console.log('Decode token error: ' + err);
			return res.sendStatus(401);
		}

		req.user = decode.profile;
		(req.user === undefined) ? req.user = decode[0]: debug('Nada');
		req.globalIdOfUser = decode.id;
		(req.globalIdOfUser === undefined) ? req.globalIdOfUser = decode[0]._id: debug('Nada');
		req.token = token;
		next(null);
	});

}


/**
 * Check if the user is the owner of the score, in other case FORBIDDEN
 */
function ensureOwner(req, res, next) {
	// var scoreId = req.params.scoreId;
	// var userId = req.user.id;
	// if (!scoreId && !userId) {
	// 	debug('ensureOwner Invalid[' + scoreId + '] or userId[' + userId + ']');
	// 	return res.status(500).send('Invalid user or score');
	// }

	// daoScore.getById(scoreId, function(err, score) {
	// 	if (err) {
	// 		debug('ensureOwner error: ' + err);
	// 		return res.status(500).send('error');
	// 	}

	// 	if (!score) {
 //  		debug('invalid score');
	// 		return res.status(500).send('invalid score');
	// 	}

	// 	if (!score || score.owner !== userId) {
	// 		debug('invalid owner score[' + score.owner + ' logged user[' + userId + ']');
	// 		return res.status(500).send('invalid owner');
	// 	}

		next(null);
	// });
}

function ensureIdFromToken(req, res, next) {



	var reqAuth = req.headers.authorization;

	var token = reqAuth.replace(/^\s*Bearer\s*/, '');


	jwt.verify(token, jwtSecret, function(err, decode) {
		if (err) {
			console.log('Decode token error: ' + err);
			return res.sendStatus(401);
		}
		req.user = decode.profile;
		req.token = token;
		next(null);
	});

	var scoreId = req.params.scoreId;
	var userId = req.user.id;
	if (!scoreId && !userId) {
		debug('ensureOwner Invalid[' + scoreId + '] or userId[' + userId + ']');
		return res.status(500).send('Invalid user or score');
	}

	// daoScore.getById(scoreId, function(err, score) {
	// 	if (err) {
	// 		debug('ensureOwner error: ' + err);
	// 		return res.status(500).send('error');
	// 	}

	// 	if (!score) {
//  		debug('invalid score');
	// 		return res.status(500).send('invalid score');
	// 	}

	// 	if (!score || score.owner !== userId) {
	// 		debug('invalid owner score[' + score.owner + ' logged user[' + userId + ']');
	// 		return res.status(500).send('invalid owner');
	// 	}

		next(null);
	// });
}



module = module.exports = {
	ensureAuthenticated: ensureAuthenticated,
	ensureOwner: ensureOwner
};
