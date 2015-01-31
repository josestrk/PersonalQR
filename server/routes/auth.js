var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../util/config').ids.google;
var jwtSecret = require('../util/config').jwtSecret;
var debug = require('debug')('pqr');
var request = require('request');
var jwt = require('jsonwebtoken');
var daoUser = require('../dao/dao_user');

function worker(io) {

	/* ROUTES */
	router.get('/login', passportLogin());
	router.get('/oauth2callback', passportCallback(), oauth2Callback);
	router.post('/rt', refreshToken);
	/* END ROUTES */

	return router;
}

function passportLogin() {
	return passport.authenticate('google', {
		session: false,
		scope: config.scopes,
		accessType: 'offline'});
}

function passportCallback() {
	return passport.authenticate('google', {session: false, failureRedirect: '/auth/login'});
}

function oauth2Callback(req, res) {
	debug('Received oauth2callback');
	console.log(req.user);
	var token = jwt.sign(req.user, jwtSecret);
	var url = '/#/loader?token=' + token;

	res.redirect(url);
}

function refreshToken(req, res) {
	var rt = req.query.rt;

	if (!rt) {
		throw new Error('No valid token found');
	} else {
		request(
						{
							url: 'https://accounts.google.com/o/oauth2/token',
							form: {
								client_id: config.client_id,
								client_secret: config.client_secret,
								grant_type: 'refresh_token',
								refresh_token: rt
							},
							method: 'POST',
							json: true
						},
		function(err, r, body) {

			if (err) {
				return res.status(500).send("Got error: " + e.message);
			}

			if (body.error) {
				return res.status(500).send(body.error + ": " + body.error_description);
			}

			res.json({access_token: body.access_token, refresh_token: rt});


		});
	}
}
//
//
// Register Google Strategy in Passport
//
passport.use(new GoogleStrategy({
	clientID: config.client_id,
	clientSecret: config.client_secret,
	callbackURL: config.callback_url
}, function(accessToken, refreshToken, profile, done) {
	console.log('---auth.js New accessToken: ' + accessToken + ', refreshToken: ' + refreshToken + ', user: ' + profile.id+'---auth.js');
	console.log(profile._json);

	//el done envia null para saber que puede continuar la ejecucion de codigo, y envia ademas los objetos que queramos para despues usar

	function insert(){
			daoUser.createUser(profile._json, function(err, res){
			if(!err){
			console.log('---auth.js');
			done(null, {accessToken: accessToken, refreshToken: refreshToken, profile: profile._json, id: res[0]._id});
			}
		});
	}

	daoUser.verifyEmail(profile._json.email, function(err, res){
		if(err){
			insert();
		}else{
			console.log(res);
			done(null, {accessToken: accessToken, refreshToken: refreshToken, profile: profile._json, id: res[0]._id});
		}
	});

}
));

module.exports = worker;
