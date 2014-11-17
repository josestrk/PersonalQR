//permite pasar mensajes a consola, con la palabra clave personalqr solo filtrariamos los asociados a x archivo
//DEBUG=* o DEBUG=personalqr
//revisar curl
var debug = require('debug')('pqr_db');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var fs = require('fs');

var config = require('./util/config');

var app = express();


app.use(favicon(__dirname + '/../httpdocs/favicon.ico')); //Sirve el favicon de la pagina
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//esto de abajo es para servir la parte estatica, seria mejor montarlo sobre nginx
app.use(express.static(path.join(__dirname, '../')));


// Custom error handler
//esto se podria uncluso quitar pero lo dejamos, porque no
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

// lees routes e incorporas a express esos ficheros,
//lo que hace es que todos los servicios que estan dentro de routes/ en el archivo tal.js se llamen como tal/
var basePath = path.join(__dirname, '/routes/');

fs.readdirSync(basePath).forEach(function(filename) {
	var basePathService = '/' + filename.replace(/\.js$/, '');
	var serviceDefinition = basePath + filename;
	app.use(basePathService, require(serviceDefinition));
});

var ip = config.server.ip;
var port = config.server.port;

app.listen(port, ip, function() {
	debug('Application listening on http://' + ip + ':' + port);
});

module.exports = app;
