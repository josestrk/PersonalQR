//permite pasar mensajes a consola, con la palabra clave personalqr solo filtrariamos los asociados a x archivo
//DEBUG=* o DEBUG=personalqr
//revisar curl
var debug = require('debug')('personalqr');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

//######################BD conecttion
//a:alevale, diria que esto no va aqui, sino en util
//conecction db mongo
var mongodb = require('mongoskin');
// obtenemos el server MongoDB que dejamos corriendo
// IP*** el puerto 27017 es el default de MongoDB
var db = new mongodb.db("mongodb://0.0.0.0:27017/personalqr",{native_parser:true});
//########################

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
//lo que hace es que todos los servicios que estan dentro de rutes en el archivo tal.js se llamen como tal/
var basePath = path.join(__dirname, '/routes/');
fs.readdirSync(basePath).forEach(function(filename) {
	var basePathService = '/' + filename.replace(/\.js$/, '');
	var serviceDefinition = basePath + filename;
	app.use(basePathService, require(serviceDefinition));
});

//configuras la ip y el puerto
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 9005;
var ip = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '0.0.0.0';

//esto despliega express
app.listen(port, ip, function() {
	debug('Application listening on http://' + ip + ':' + port);
});

//######################BD conecttion change
module.exports = {
	db:db,
	toObjectID: mongodb.helper.toObjectID
};
