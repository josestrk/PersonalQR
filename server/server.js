//permite pasar mensajes a consola, con la palabra clave personalqr solo filtrariamos los asociados a x archivo
//DEBUG=* o DEBUG=personalqr
//revisar curl
var debug = require('debug')('pqr_db');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var fs = require('fs');
var passport = require('passport');

var config = require('./util/config');

var app = express();
var http = require('http').Server(app);

var io = require('./util/socket.io')(http);

app.use(favicon('./img/favicon.ico')); //Sirve el favicon de la pagina
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//esto de abajo es para servir la parte estatica, seria mejor montarlo sobre nginx
app.use(express.static(path.join(__dirname, '../')));

//add to autentification
app.use(passport.initialize());
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	next();
});

// Custom error handler
//esto se podria uncluso quitar pero lo dejamos
app.use(function(err, req, res, next) {
	if (err) {
            if (!err.statusCode || err.statusCode === 500) {
                    console.error(err);
            }
            var errorJson = {
                    err: err.err || err.code || 'server_error',
                    des: err.des || err.message || err.name || 'unknown'
            };
						res.status(err.statusCode || 500).json(errorJson);
	} else {
            next();
	}
});

//
// Routes
//

// lees routes e incorporas a express esos ficheros,
//lo que hace es que todos los servicios que estan dentro de routes/ en el archivo tal.js se llamen como tal/
var basePath = path.join(__dirname, '/routes/');

fs.readdirSync(basePath).forEach(function(filename) {
	var basePathService = '/' + filename.replace(/\.js$/, '');
	var serviceDefinition = basePath + filename;
	app.use(basePathService, require(serviceDefinition)(io));
});

var ip = config.server.ip;
var port = config.server.port;

http.listen(port, ip, function() {
	debug('Application listening on http://' + ip + ':' + port);
});

module.exports = app;
