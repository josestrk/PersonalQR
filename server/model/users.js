var User = require('./user').User;
var Article = require('./user').Article;
//importas del objeto export{} de user.js el metodo de creacion de usuarios, y sus metodos asociados

var users = {};//te creas un array temporal en el que ir guardando los usuarios, (para cuando llames al metodogetall)
var numUsers = 0;//para llamar al id de uno concreto

var articles = {};//te creas un array temporal en el que ir guardando los usuarios, (para cuando llames al metodogetall)
var numarticles = 0;//para llamar al id de uno concreto


module.exports = {
	createuser: function() {
		var temporaluser = new User(String(numUsers));
		users[numUsers] = temporaluser;
		numUsers++;
		return temporaluser;
	},
	createarticle: function() {
		var articleaux = new Article(String(numarticles));
		articles[numarticles] = articleaux;
		numarticles++;
		return articleaux;
	},
	getuser: function(Iduser) {
		return users[Iduser];
	},
	getarticle: function(Idarticle) {
		return articles[Idarticle];
	},
	deluser: function delScore(Iduser) {
		delete users[Iduser];
	},
	delarticle: function delScore(Idarticle) {
		delete articles[Idarticle];
	},
	getAlluser: function() {
		return Object.keys(users).map(function(Iduser) {
			return users[Iduser].toJSON();
		});
	},
	getAllarticle: function() {
		return Object.keys(articles).map(function(Idarticle) {
			return articles[Idarticle].toJSON();
		});
	},
	setUser: function(scoreId, data){
		users[scoreId].setusername(data);
		return users[scoreId];
	},
	setAllarticle: function(Idarticle, autor, titulo, contenido, t, topicos, fecha){
		articles[Idarticle].setall(autor, titulo, contenido, t, topicos, fecha);
		return users[Idarticle];
	}
};
