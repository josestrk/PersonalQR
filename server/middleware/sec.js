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
		debug('No authorization header found');
		res.send(401); // Unauthorized
		return;
	}

	var token = reqAuth.replace(/^\s*Bearer\s*/, '');
	
	
	if (!token) {
		debug('No authorization token found');
		res.send(401); // Unauthorized
		return;
	}


	jwt.verify(token, jwtSecret, function(err, decode) {

		if (err) {
			debug('Decode token error: ' + err);
			return res.send(401);
		}
		req.user = decode.profile;
		req.token = token;
		next(null);
	});

}


/**
 * Check if the user is the owner of the score, in other case FORBIDDEN
 */
function ensureOwner(req, res, next) {
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
		
	// 	next(null);
	// });
}


module = module.exports = {
	ensureAuthenticated: ensureAuthenticated,
	ensureOwner: ensureOwner
};
