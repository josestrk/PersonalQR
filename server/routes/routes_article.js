var debug = require('debug')('pqr_db');
var express = require('express');
var router = express.Router();
var articleManager = require('../manager/manager_article');

var ensureAuth = require('../middleware/sec').ensureAuthenticated;
var ensureOwner = require('../middleware/sec').ensureOwner;

var sanitizeHtml = require('sanitize-html');

function worker(io) {
  //habra que meter aqui los emit de socket.IO

  //articles
  router.post('/article', ensureAuth, createArticle);
  router.post('/editarticle', ensureAuth, ensureOwner, editArticle);
  // router.get('/article/:articleId', getArticle);
  router.post('/article/:id', getArticles);
  router.get('/myarticles/:id', ensureAuth, getUserArticles);
  router.get('/articles/:id', getArticlesAll);
  //creo que ha quedado deprecated
  router.put('/article/:articleId', ensureAuth, ensureOwner, setArticle);
  router.delete('/article/:articleId', ensureAuth, ensureOwner, delArticle);
  router.delete('/deleteall/', delArticlesAll);

  router.post('/searchbytopic', searchbytopic);
  router.post('/addcomment', ensureAuth, comment);

  router.post('/like', ensureAuth, like);
  router.post('/unlike', ensureAuth, unlike);

  function like(req, res) {
    var articleId =  req.body.articleId;
    var userId =  req.globalIdOfUser;

    articleManager.like(articleId, userId, function(err, result){
      if(result){
        io.alexEmit('onelikemore', result);
        res.json(result);
      }else{
        res.status(404).send('Not a valid article, or database error');
      }
    });
  }

  function unlike(req, res) {
    var articleId =  req.body.articleId;
    var userId =  req.globalIdOfUser;

    articleManager.unlike(articleId, userId, function(err, result){
      if(result){
        io.alexEmit('oneunlikemore', result);
        res.json(result);
      }else{
        res.status(404).send('Not a valid article, or database error');
      }
    });
  }



  function delArticlesAll(req, res) {
    debug('Deleting all articles');
    articleManager.delArticlesAll(function(err, result){
        if(result === null){
          res.status(404).send('There was no articles in database');
        }else{
          res.send('All articles were removed');
        }
      });
  }


  function comment(req, res) {
    var articleId =  req.body.articleId;
    var comment =  sanitizeHtml(req.body.comment);
    var name = req.user.name;
    var iduser = req.globalIdOfUser;

    articleManager.comment(articleId, comment, name, iduser, function(err, result){
      if(result){
        debug('Time of response ->');
        var aux = {
          articleId : articleId,
          comment : comment,
          name : name,
          iduser : iduser,
          owner : result.iduser
        }
        io.alexEmit('commentadded', aux);
        res.json(result);
      }else{
        res.status(404).send('Not a valid article, or database error');
      }
    });
  }

  // function like(req, res) {
  //   var articleId =  req.body.articleId;
  //   var name = req.user.name;
  //   var iduser = req.globalIdOfUser;
  //   debug('like from this user -> ' + name);
  //   debug('to this artId -> ' + articleId);
  //
  //   articleManager.like(articleId, comment, name, iduser, function(err, result){
  //     if(result){
  //       debug('Time of response ->');
  //       res.json(result);
  //     }else{
  //       res.status(404).send('Not a valid article, or database error');
  //     }
  //   });
  // }



  function searchbytopic(req, res) {
    var topic =  req.body.topic.toLowerCase();
    debug('Search of this topic -> ' + topic);
    articleManager.searchbytopic(topic, function(err, result){
      if(result){
        debug('Time of response ->');
        res.json(result);
      }else{
        res.status(404).send('Topic not found');
      }
    });
  }

  function createArticle(req, res) {
    var Article = {};

    Article["iduser"] = req.globalIdOfUser;

    if (req.body.title !== undefined) {
      Article["title"] = sanitizeHtml(req.body.title, {allowedTags: []});
    } else {
      Article["title"] = "";
    }

    if (req.body.content !== undefined) {
      Article["content"] = sanitizeHtml(req.body.content);
    } else {
      Article["content"] = "";
    }
    Article["topic"] = getTopics(sanitizeHtml(req.body.content, {allowedTags: [], allowedAttributes: {}}).toLowerCase());
    Article["date"] = getDateTime();
    Article["bgimg"] = "http://makeonweb.es/josestrk/img/small/bg-"+req.body.bgimg+".jpg";


    articleManager.createArticle(Article, function(err, result){
      res.json(result);
      io.alexEmit('articleCreated', result);
    });
  }

  function editArticle(req, res) {
    var Article = {};

    //controladores de acceso
    Article["iduser"] = req.globalIdOfUser;

    if(req.body.title !== undefined){
      Article["title"] = sanitizeHtml(req.body.title, {allowedTags: []});
    } else {
      Article["title"] = "";
    }

    if(req.body.content !== undefined){
      Article["content"] = sanitizeHtml(req.body.content);
    } else {
      Article["content"] = "";
    }

    Article["topic"] = getTopics(sanitizeHtml(req.body.content, {allowedTags: [], allowedAttributes: {}}).toLowerCase());
    Article["date"] = getDateTime();

    if (req.body.bgimg!==undefined) {
      Article["bgimg"]=req.body.bgimg
    } else {
      Article["bgimg"]="http://makeonweb.es/josestrk/img/small/bg-1.jpg";
    }

    Article["_id"]=req.body._id;

    articleManager.editArticle(Article, function(err, result){
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

    return year +
        '-' + (month) +
        '-' + (day) +
        'T' + (hour) +
        ':' + (minute) +
        ':' + (second) +
        '-00:00';

    // var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;
    // return dateTime;
  }

  function getTopics(content){
    var a = content;
    var res = [];
    a = a.split('#');

    for(i in a){
      a[i] = a[i].split(' ');
      if(a[i][0] !== "" && i!=0){
        res.push(a[i][0]);
      }
    }
    return res;
  }


  // function getArticle(req, res) {
  //   var articleId = req.params['articleId'];
  //   articleManager.getArticle(articleId, function(err, result){
  //     if(result){
  //       res.json(result);
  //     } else {
  //       next(new Error(new Error(articleId + 'as article id does not exist')));
  //     }
  //   });
  // }


  function getArticles(req, res) {
    var skip = req.param('id');
    articleManager.getmyarticles(skip, req.body.id, function(err, result){
      if(result[0] === undefined){
        res.status(404).send('No articles found for this user');
      }else{
        res.json(result);
      }
    });
  }

  function getUserArticles(req, res) {
    var skip = req.param('id');
    articleManager.getmyarticles(skip, req.globalIdOfUser, function(err, result){
      res.json(result);
    });
  }

  function getArticlesAll(req, res) {
    var skip = req.param('id');
    articleManager.getArticlesAll(function(err, result){
      res.json(result);
    }, skip);
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
    //implementar como resultado de un callback pidiendo si es al que le pertenecen los archivos
    var articleId = req.param('articleId');

    articleManager.delArticle(articleId, function(err, result){
      if(result === 0){
        res.status(404).send('Article ' + articleId + ' does not exist at our server. ');
      }else{
        res.status(200).send('Article ' + articleId + ' removed. ');
      }
    });
  }

  return router;
}

module.exports = worker;
