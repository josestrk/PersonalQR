var daoArticle = require('../dao/dao_article');

function createArticle(article, callback) {
    article["likes"]= "";
    article["coments"]=[];
  daoArticle.createArticle(article, callback);
}

function editArticle(article, callback) {
  // article["likes"]= "";
  // article["coments"]=[];
  daoArticle.editArticle(article, callback);
}

function getArticle(articleId, callback) {
  daoArticle.getArticle(articleId, callback);
}

function getUserArticles(userId, callback) {
  daoArticle.getUserArticles(userId, callback);
}

function delArticle(articleId, callback) {
  daoArticle.delArticle(articleId, callback);
}

function getArticlesAll(callback, skip) {
  daoArticle.getArticlesAll(callback, skip);
}

function setArticle(articleId, data, callback){

  /*if(req.body.authorId!==undefined){
    Article.$set["authorId"]=req.body.authorId;
  }
  if(req.body.title!==undefined){
    Article.$set["title"]=req.body.title;
  }
  if(req.body.content!==undefined){
    Article.$set["content"]=req.body.content;
  }
  if(req.body.tags!==undefined){
    Article.$set["tags"]=req.body.tags;
  }
  if(req.body.topics!==undefined){
    Article.$set["topics"]=req.body.topics;
  }
  if(req.body.date!==undefined){
    Article.$set["date"]=req.body.date;
  }




  var res = data.name.match(/[\w*\s+])[0];
  if(data.name!==res){
    return callback("Error", null);//asi se crea un error para el ajax
  }//gracias al return se interrumpe la ejecucion del codigo
  data.name = res;*/
  console.log(data);

  daoArticle.setArticle(articleId, data, callback);
}

module.exports = {
	createArticle: createArticle,
	getArticle: getArticle,
  getUserArticles: getUserArticles,
	getArticlesAll: getArticlesAll,
	delArticle: delArticle,
	setArticle: setArticle,
  editArticle: editArticle
};
