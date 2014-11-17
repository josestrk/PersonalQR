var daoArticle = require('../dao/article');

var Article = require('./article').Article;
//importas del objeto export{} de user.js el metodo de creacion de usuarios, y sus metodos asociados

module.exports = {
	createarticle: function() {
		var articleaux = new Article(String(numarticles));
		articles[numarticles] = articleaux;
		numarticles++;
		return articleaux;
	},
	getarticle: function(Idarticle) {
		return articles[Idarticle];
	},
	delarticle: function delScore(Idarticle) {
		delete articles[Idarticle];
	},
	getAllarticle: function() {
		return Object.keys(articles).map(function(Idarticle) {
			return articles[Idarticle].toJSON();
		});
	},
	setAllarticle: function(Idarticle, autor, titulo, contenido, t, topicos, fecha){
		articles[Idarticle].setall(autor, titulo, contenido, t, topicos, fecha);
		return users[Idarticle];
	}
};
