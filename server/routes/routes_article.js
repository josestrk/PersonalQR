var debug = require('debug')('pqr_db');
var express = require('express');
var router = express.Router();
var articleManager = require('../manager/manager_article');

//articles
router.post('/article', createArticle);
// router.get('/article/:articleId', getArticle);
router.get('/article/:userId', getUserArticles);
router.get('/article', getArticlesAll);
router.put('/article/:articleId', setArticle);
router.delete('/article/:articleId', delArticle);

function createArticle(req, res) {
  var Article={
  };

  if(req.body.iduser!==undefined){
      Article["iduser"]=req.body.iduser;
    }else{
    //esto no se deberia permitir pero... de momento lo dejamos..
      Article["iduser"]="";
  }
  if(req.body.title!==undefined){
      Article["title"]=req.body.title;
    }else{
      Article["title"]="";
  }
  if(req.body.content!==undefined){
      Article["content"]=req.body.content;
    }else{
      Article["content"]="";
  }

  Article["topic"]=getTopics(req.body.content);
  Article["date"]=getDateTime();
  Article["bgimg"]="http://makeonweb.es/josestrk/img/small/bg-"+req.body.bgimg+".jpg";

  articleManager.createArticle(Article, function(err, result){
    res.json(result);
  });
}

function getDateTime() {
    var now     = new Date();
    var year    = now.getFullYear();
    var month   = now.getMonth()+1;
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds();
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;
     return dateTime;
}

function getTopics(content){
  var a=content;
  var res=[];
  a = a.split('#');

  for(i in a){
    a[i] = a[i].split(' ');
    if(a[i][0] !== "" && i!=0){
      res.push(a[i][0]);
    }
  }
  return res;
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

function getUserArticles(req, res) {
  console.log(req.param('userId'));
  articleManager.getUserArticles(req.param('userId'), function(err, result){
    res.json(result);
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
