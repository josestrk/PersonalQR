var debug = require('debug')('manager');
var daoArticle = require('../dao/dao_article');
var daoTopic = require('../dao/dao_topic');


function createArticle(article, callback) {
  article["likes"]= [];
  article["unlikes"]= [];
  article["coments"]=[];
  daoArticle.createArticle(article, callback);
  createtopic(article.topic);
}

function createtopic(topics){
  var res = topics;
  for(var i in res){
    daoTopic.getTopic(res[i], function(err, result){
      debug('resultado es ->'+result);
      var aux = '';
      for (var i in this){
        aux += this[i];
      }
      if(result[0] == undefined){
        debug('Escribiendo en bbdd->'+aux);
        daoTopic.createTopic(aux, function(err, resu){
          debug('escrito'+resu);
        });
      }
    }.bind(res[i]));
  }
}


function comment(articleId, comment, name, iduser, callback){
  daoArticle.comment(articleId, comment, name, iduser, callback);
}

function like(articleId, iduser, callback){
  daoArticle.like(articleId, iduser, callback);
}

function unlike(articleId, iduser, callback){
  daoArticle.unlike(articleId, iduser, callback);
}

function delArticlesAll(callback){
  daoArticle.delArticlesAll(callback);
}

function editArticle(article, callback) {
  createtopic(article.topic);
  daoTopic.createTopic(article.topic, function(err, res){
  });
}

function getArticle(articleId, callback) {
  daoArticle.getArticle(articleId, callback);
}

function searchbytopic(topic, callback) {
  daoArticle.searchbytopic(topic, callback);
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

function getmyarticles(skip, userId, callback) {
  daoArticle.getmyarticles(skip, userId, callback);
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
  createtopic(article.topic);
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
  editArticle: editArticle,
  searchbytopic : searchbytopic,
  comment : comment,
  delArticlesAll : delArticlesAll,
  getmyarticles : getmyarticles,
  like : like,
  unlike : unlike
};
