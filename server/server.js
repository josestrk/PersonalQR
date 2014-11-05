var debug = require('debug')('PersonalQr');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var fs = require('fs');

var app = express();

app.use(favicon(__dirname + '/../httpdocs/favicon.ico')); //Sirve el favicon de la pagina
app.use(express.static(path.join(__dirname, '../')));


// Custom error handler
app.use(function(err, req, res, next) {
	if (err) {

		if (!err.statusCode || err.statusCode === 500) {
			console.error(err);
		}

		var errorJson = {
			err: err.err || err.code || 'server_error',
			des: err.des || err.message || err.name || 'unknown'
		};

		res.json(err.statusCode || 500, errorJson);

	} else {
		next();
	}
});



//
// Routes
//

var basePath = path.join(__dirname, '/routes/');
fs.readdirSync(basePath).forEach(function(filename) {
	var basePathService = '/' + filename.replace(/\.js$/, '');
	var serviceDefinition = basePath + filename;
	app.use(basePathService, require(serviceDefinition));
});

var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 9005;
var ip = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '0.0.0.0';

app.listen(port, ip, function() {
	debug('Application listening on http://' + ip + ':' + port);
});

module.exports = app;
