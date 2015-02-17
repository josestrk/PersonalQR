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
  router.get('/article', ensureAuth, getUserArticles);
  router.get('/articles/:id', getArticlesAll);
  //creo que ha quedado deprecated
  router.put('/article/:articleId', ensureAuth, ensureOwner, setArticle);
  router.delete('/article/:articleId', ensureAuth, ensureOwner, delArticle);

  router.post('/searchbytopic', searchbytopic);
  router.post('/addcomment', ensureAuth, comment);



  function comment(req, res) {
    var articleId =  req.body.articleId;
    var comment =  sanitizeHtml(req.body.comment);
    var name = req.user.name;
    var iduser = req.globalIdOfUser;
    debug('Id -> ' + articleId);
    debug('posting this coment -> ' + comment);
    debug('from this user -> ' + name);
    debug('from this id -> ' + iduser);

    articleManager.comment(articleId, comment, name, iduser, function(err, result){
      if(result){
        debug('Time of response ->');
        res.json(result);
      }else{
        res.status(404).send('Topic not found');
      }
    });
  }



  function searchbytopic(req, res) {
    var topic =  req.body.topic;
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

    Article["topic"] = getTopics(sanitizeHtml(req.body.content));
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
    if (req.body.iduser !== undefined){
      Article["iduser"] = req.body.iduser;
    } else {
      //esto no se deberia permitir pero... de momento lo dejamos..
      Article["iduser"] = "";
    }

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

    Article["topic"] = getTopics(req.body.content);
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
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;
    return dateTime;
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

  function getUserArticles(req, res) {
    articleManager.getUserArticles(req.globalIdOfUser, function(err, result){
      // result["date"]=getDateTime()-result["date"];
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


/* OLD

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
  router.get('/article', ensureAuth, getUserArticles);
  router.get('/articles/:id', getArticlesAll);

  router.get('/publicarticles/:id', publicArticles);
  router.get('/myarticles/:id', ensureAuth, myArticles);
  //creo que ha quedado deprecated
  router.put('/article/:articleId', ensureAuth, ensureOwner, setArticle);
  router.delete('/article/:articleId', ensureAuth, ensureOwner, delArticle);


  function publicArticles(req, res) {
    var owner = req.param('owner');
    articleManager.getUserArticles(owner, function(err, result){
      res.json(result);
    });
  }
  function myArticles(req, res) {
    articleManager.getUserArticles(req.globalIdOfUser, function(err, result){
      // result["date"]=getDateTime()-result["date"];
      res.json(result);
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

    Article["topic"] = getTopics(req.body.content);
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
    if (req.body.iduser !== undefined){
      Article["iduser"] = req.body.iduser;
    } else {
      //esto no se deberia permitir pero... de momento lo dejamos..
      Article["iduser"] = "";
    }

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

    Article["topic"] = getTopics(req.body.content);
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
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;
    return dateTime;
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
  //   var articleId = req.param('articleId');
  //   articleManager.getArticle(articleId, function(err, result){
  //     if(result){
  //       res.json(result);
  //     } else {
  //       next(new Error(new Error(articleId + 'as article id does not exist')));
  //     }
  //   });
  // }

  function getUserArticles(req, res) {
    articleManager.getUserArticles(req.globalIdOfUser, function(err, result){
      // result["date"]=getDateTime()-result["date"];
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


*/
