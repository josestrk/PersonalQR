var daoArticle = require('../dao/dao_article');

function createArticle(callback) {
  var temporalArticle = {
    title : "",
    content : "",
    tags : "",
    topics : "",
    likes: "",
    comments: new Array(),
    date : ""
  };
  daoArticle.createArticle(temporalArticle, callback);
}

function getArticle(articleId, callback) {
  daoArticle.getArticle(articleId, callback);
}

function delArticle(articleId, callback) {
  daoArticle.delArticle(articleId, callback);
}

function getArticles(callback) {
  daoArticle.getArticles(callback);
}

function setArticle(articleId, data, callback){
  daoArticle.setArticle(articleId, data, callback);
}

module.exports = {
	createArticle: createArticle,
	getArticle: getArticle,
	getArticles: getArticles,
	delArticle: delArticle,
	setArticle: setArticle
};
