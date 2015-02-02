var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var confgg = require('../util/config').ids.google;
var FacebookStrategy = require('passport-facebook').OAuth2Strategy;
var conffb = require('../util/config').ids.facebook;
var jwtSecret = require('../util/config').jwtSecret;
var debug = require('debug')('pqr');
var request = require('request');
var jwt = require('jsonwebtoken');
var daoUser = require('../dao/dao_user');

function worker(io) {

/* ROUTES */
	/*GOOGLE*/
	router.get('/login', passportLogin());
	router.get('/oauth2callback', passportCallback(), oauth2Callback);
	router.post('/rt', refreshToken);
	/*FACEBOOK*/
	router.get('/loginfb', passportLoginFb());
	router.get('/oauth2callbackfb', passportCallbackFb(), oauth2CallbackFb);
	router.post('/rtfb', refreshTokenFb);
/* END ROUTES */

	return router;
}

//-------------------------------------------------
//------------------  GOOGLE ----------------------
//-------------------------------------------------

function passportLogin() {
	return passport.authenticate('google', {session: false,scope: confgg.scopes,accessType: 'offline'});
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
								client_id: confgg.client_id,
								client_secret: confgg.client_secret,
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


// Register Google Strategy in Passport

passport.use(new GoogleStrategy({
	clientID: confgg.client_id,
	clientSecret: confgg.client_secret,
	callbackURL: confgg.callback_url
}, function(accessToken, refreshToken, profile, done) {
	console.log('[GOOGLE] auth.js New accessToken: ' + accessToken + ', refreshToken: ' + refreshToken + ', user: ' + profile.id+'---auth.js');

	//el done envia null para saber que puede continuar la ejecucion de codigo, y envia ademas los objetos que queramos para despues usar
	function insert(){
			daoUser.createUser(profile._json, function(err, res){
			if(!err){
			done(null, {accessToken: accessToken, refreshToken: refreshToken, profile: profile._json, id: res[0]._id});
			}
		});
	}

	daoUser.verifyEmail(profile._json.email, function(err, res){
		if(!err){
			insert();
		}else{
			done(null, {accessToken: accessToken, refreshToken: refreshToken, profile: profile._json, id: res[0]._id});
		}
	});

}
));

//-------------------------------------------------
//-----------------  FACEBOOK----------------------
//-------------------------------------------------

function passportLoginFb() {
	return passport.authenticate('facebook', {session: false,scope: conffb.scopes,accessType: 'offline'});
}

function passportCallbackFb() {
	return passport.authenticate('facebook', {session: false, failureRedirect: '/auth/loginfb'});
}

function oauth2CallbackFb(req, res) {
	debug('Received oauth2callbackFb');
	console.log(req.user);
	var token = jwt.sign(req.user, jwtSecret);
	var url = '/#/loader?token=' + token;

	res.redirect(url);
}

function refreshTokenFb(req, res) {
	var rt = req.query.rt;

	if (!rt) {
		throw new Error('No valid token found');
	} else {
		//http://graph.facebook.com/endpoint?key=value&access_token=app_id|app_secret
		request(
						{
							url: 'http://graph.facebook.com',
							form: {
								client_id: conffb.client_id,
								client_secret: conffb.client_secret,
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


//Register Facebook Strategy in Passport

// passport.use(new FacebookStrategy({
// 	clientID: conffb.client_id,
// 	clientSecret: conffb.client_secret,
// 	callbackURL: conffb.callback_url
// }, function(accessToken, refreshToken, profile, done) {
// 	console.log('[FACEBOOK] New accessToken: ' + accessToken + ', refreshToken: ' + refreshToken + ', user: ' + profile.id);
// 	console.log(profile._json);

// 	//el done envia null para saber que puede continuar la ejecucion de codigo, y envia ademas los objetos que queramos para despues usar

// 	function insert(){
// 			daoUser.createUser(profile._json, function(err, res){
// 			if(!err){
// 			done(null, {accessToken: accessToken, refreshToken: refreshToken, profile: profile._json, id: res[0]._id});
// 			}
// 		});
// 	}

// 	daoUser.verifyEmail(profile._json.email, function(err, res){
// 		if(err){
// 			insert();
// 		}else{
// 			console.log(res);
// 			done(null, {accessToken: accessToken, refreshToken: refreshToken, profile: profile._json, id: res[0]._id});
// 		}
// 	});

// }
// ));

module.exports = worker;