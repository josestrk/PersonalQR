var express = require('express');
var router = express.Router();
var articleManager = require('../manager/manager_article');

//articles
router.post('/article', createArticle);
router.get('/article/:articleId', getArticle);
router.get('/article', getArticles);
router.put('/article/:articleId', setArticle);
router.delete('/article/:articleId', delArticle);

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
      next(new Error(new Error(articleId + 'as article id does not exist')));
    }
  });
}

function getArticles(req, res) {
  articleManager.getArticles(function(err, result){
    res.json(result);
  });
}

function setArticle(req, res) {
  var articleId = req.param('articleId');

  var Article={
    "title": req.body.title,
	"content": req.body.content,
	"tags": req.body.tags,
	"topics": req.body.topics,
	"date": req.body.date
  };

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

  articleManager.delArticle(articleId, function(err, result){
    if(result === null){
      next(new Error(new Error('Specified ID ' + articleId + ' does not exist')));
    }else{
      res.send('Article ' + articleId + ' removed.');
    }
  });
}

module.exports = router;
