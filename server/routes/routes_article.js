var express = require('express');
var router = express.Router();
var articleManager = require('../manager/manager_article');

//articles
router.post('/particle', createArticle);
router.get('/garticle/:articleId', getArticle);
router.get('/garticle', getAllArticles);
router.put('/putarticle/:articleId', setArticle);
router.delete('/delarticle/:articleId', delArticle);

function createArticle(req, res) {
  articleManager.createArticle(function(err, result){
    res.json(result);
  });
}

function getArticle(req, res) {
  var articleId = req.param('articleId');
  articleManager.getArticle(articleId, function(err, result){
    if(result){
      res.json(result);
    } else {
      next(new Error(new Error(articleId + 'as user id does not exist')));
    }
  });
}

function getAllArticles(req, res) {
  articleManager.getAllArticles(function(err, result){
    res.json(result);
  });
}

function setArticle(req, res) {
  var articleId = req.param('articleId');
  var Article={
    $set:{}
  };

  Article.$set[title]= req.body.titulo;
  Article.$set[content]=  req.body.contenido;
  Article.$set[tags]=  req.body.t;
  Article.$set[topics] = req.body.topicos;
  Article.$set[date] = req.body.fecha;

  articleManager.setArticle(articleId, Article, function(err, result){
    if(result === null){
      next(new Error(new Error('Specified ID ' + articleId + ' does not exist')));
    } else {
      res.json(result);
    }
  });
}

function delArticle(req, res) {
  var articleId = req.param('articleId');

  articleManager.delArticle(userId, function(err, result){
    if(result === null){
      next(new Error(new Error('Specified ID ' + articleId + ' does not exist')));
    }else{
      res.send('User ' + articleId + ' removed.');
    }
  });
}

module.exports = router;
