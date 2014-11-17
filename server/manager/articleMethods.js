var daoArticle = require('../dao/article');

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
    daoArticle.get(Idarticle, callback);
}

function del(Idarticle, callback) {
    daoArticle.del(Idarticle, callback);
}

function getAll(callback) {
    daoArticle.getAll(callback);
}

function setArticle(Idarticle, data, callback){
    daoArticle.setArticle(Idarticle, data, callback);
}

module.exports = {
	createArticle: create,
	getArticle: get,
	delArticle: del,
	getAllArticle: getAll,
	setArticle: setArticle
};