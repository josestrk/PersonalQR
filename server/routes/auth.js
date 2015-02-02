var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').OAuth2Strategy;
var config = require('../util/config').ids.google;
var jwtSecret = require('../util/config').jwtSecret;
var debug = require('debug')('pqr');
var request = require('request');
var jwt = require('jsonwebtoken');

function worker(io) {

	/* ROUTES */
	router.get('/login', passportLogin());
	router.get('/loginfb', passportLoginFb());
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

function passportLoginFb() {
	return passport.authenticate('facebook', {
		session: false,
		scope: config.scopes,
		accessType: 'offline'});
}

function passportCallback() {
	return passport.authenticate('google', {session: false, failureRedirect: '/auth/login'});
}

function oauth2Callback(req, res) {
	debug('Received oauth2callback');
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
	console.log('passport use');
	console.log('New accessToken: ' + accessToken + ', refreshToken: ' + refreshToken + ', user: ' + profile.id);
	console.log(profile);
	done(null, {accessToken: accessToken, refreshToken: refreshToken, profile: profile});
}
));

// passport.use(new FacebookStrategy({
// 	clientID: config.client_id,
// 	clientSecret: config.client_secret,
// 	callbackURL: config.callback_url
// }, function(accessToken, refreshToken, profile, done) {
// 	console.log('passport use');
// 	console.log('New accessToken: ' + accessToken + ', refreshToken: ' + refreshToken + ', user: ' + profile.id);
// 	console.log(profile);
// 	done(null, {accessToken: accessToken, refreshToken: refreshToken, profile: profile});
// }
// ));

module.exports = worker;
