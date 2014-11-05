var User = require('./user').User;
//importas del objeto export{} de user.js el metodo de creacion de usuarios, y sus metodos asociados

var users = {};//te creas un array temporal en el que ir guardando los usuarios, (para cuando llames al metodogetall)
var numUsers = 0;//para llamar al id de uno concreto

module.exports = {
	create: function() {
		var temporaluser = new User(String(numUsers));
		//creas un user nuevo, por lo que solo pasas el id y se creaa sus valores por defecto
		users[numUsers] = temporaluser;
		numUsers++;
		return temporaluser;
	},
	get: function(scoreId) {
		return users[scoreId];
	},
	del: function delScore(scoreId) {
		delete users[scoreId];
	},
	getAll: function() {
		return Object.keys(users).map(function(idScore) {
			return users[idScore].toJSON();
		});
	}
};
