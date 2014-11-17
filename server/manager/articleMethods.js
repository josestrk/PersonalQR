var daoArticle = require('../dao/article');

//var Article = require('./article').Article;
//importas del objeto export{} de article.js el metodo de creacion de usuarios, y sus metodos asociados
function create(callback) {
    var temporalarticle = {
        title : "",
        content : "",
        tags : "",
        topics : "",
        likes: "",
        comments: new Array(),
        date : ""
    };
    daoArticle.create(temporalarticle, callback);
}

function get(Idarticle, callback) {
    daoArticle.getById(Idarticle, callback);
}

function del(Idarticle, callback) {
    daoArticle.delArticle(Idarticle, callback);
}

function getAll(callback) {
    daoArticle.getAll(callback);
}

function setArticle(Idarticle, data, callback){
    daoArticle.setArticle(Idarticle, data, callback);
}

module.exports = {
	createarticle: create,
	getarticle: get,
	delarticle: del,
	getAllarticle: getAll,
	setArticle: setArticle
};