var daoArticle = require('../dao/article');

//importas del objeto export{} de article.js el metodo de creacion de usuarios, y sus metodos asociados
function create(callback) {
  var temporalArticle = {
    title : "",
    content : "",
    tags : "",
    topics : "",
    likes: "",
    comments: new Array(),
    date : ""
  };
  daoArticle.create(temporalArticle, callback);
}

function get(articleId, callback) {
  daoArticle.get(articleId, callback);
}

function del(articleId, callback) {
  daoArticle.del(articleId, callback);
}

function getAll(callback) {
  daoArticle.getAll(callback);
}

function setArticle(articleId, data, callback){
  daoArticle.setArticle(articleId, data, callback);
}

module.exports = {
	createArticle: create,
	getArticle: get,
	delArticle: del,
	getAllArticles: getAll,
	setArticle: setArticle
};