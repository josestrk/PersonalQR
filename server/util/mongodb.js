//este archivo nos sirve para que funcione el module exports de test.js en la carpeta dao
var config = require('./config');
var mongo = require('mongoskin');

var db = mongo.db(config.db.conn, {native_parser:true});

module.exports = {
	db: db,
	toObjectID: mongo.helper.toObjectID
};
