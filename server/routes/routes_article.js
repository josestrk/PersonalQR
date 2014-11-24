var debug = require('debug')('pqr_db');
var express = require('express');
var router = express.Router();
var articleManager = require('../manager/manager_article');

//articles
router.post('/article', createArticle);
router.get('/article/:articleId', getArticle);
router.get('/article', getArticlesAll);
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

function getArticlesAll(req, res) {
  articleManager.getArticlesAll(function(err, result){
    res.json(result);
  });
}

function setArticle(req, res) {
  var articleId = req.param('articleId');

  var Article={
    $set:{
    }
  };

  if(req.body.authorId!==undefined){
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
