var User = require('./user').User;
//importas del objeto export{} de user.js el metodo de creacion de usuarios, y sus metodos asociados

var users = {};//te creas un array temporal en el que ir guardando los usuarios, (para cuando llames al metodogetall)
var numUsers = 0;//para llamar al id de uno concreto

module.exports = {
	createuser: function() {
		var temporaluser = new User(String(numUsers));
		users[numUsers] = temporaluser;
		numUsers++;
		return temporaluser;
	},
	getuser: function(Iduser) {
		return users[Iduser];
	},
	deluser: function delScore(Iduser) {
		delete users[Iduser];
	},
	getAlluser: function() {
		return Object.keys(users).map(function(Iduser) {
			return users[Iduser].toJSON();
		});
	},
	setUser: function(scoreId, data){
		users[scoreId].setusername(data);
		return users[scoreId];
	},
};
