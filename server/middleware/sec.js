var jwtSecret = require('../util/config').jwtSecret;
var debug = require('debug')('pqr_sec');
var jwt = require('jsonwebtoken');
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
		(req.user === undefined) ? req.user = decode[0]: debug('No undefined');
		req.globalIdOfUser = decode.id;
		(req.globalIdOfUser === undefined) ? req.globalIdOfUser = decode[0]._id: debug('No undefined');
		req.token = token;
		next(null);
	});

}


function ensureOwner(req, res, next) {
	var articleId = req.params.articleId;
	var userId = req.globalIdOfUser;

	daoArticle.getArticle(articleId, function(err, result){
		if(err || result.iduser !== userId){
			res.status(500).send('Error, invalid id, or the article is not accesible');
		}else{
			next(null);
		}
	});
}

module = module.exports = {
	ensureAuthenticated: ensureAuthenticated,
	ensureOwner: ensureOwner
};
