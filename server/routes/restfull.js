var express = require('express');
var router = express.Router();

var globalManager = require('../model/allmethods');

/* VALID ROUTES TO API */

router.post('/user', createUser);
router.post('/article', createArticle);

router.put('/article/:articleId', setAllarticleparams);
router.put('/:userId', setUsern);

router.delete('/user/:userId', delUSer);
router.delete('/article/:articleId', delArticle);

router.get('/user/:userId', getUser);
router.get('/article/:articleId', getArticle);
router.get('/user', getAllusers);
router.get('/article', getAllarticles);

/* END ROUTES */



//pasamos de tener una respuesta sincrona a una asincrona, por lo que los resultados
//se dan dentro de una funcion con "posibilidad" de error
function createUser(req, res) {
  globalManager.createuser(function(err, result){
    res.json(result);
  });
}

function createArticle(req, res) {
  globalManager.createarticle(function(err, result){
    res.json(result);
  });
}


function setAllarticleparams(req, res) {
  var id_autor = req.body.autor;
  var tittle = req.body.titulo;
  var content = req.body.contenido;
  var tags = req.body.t;
  var topics = req.body.topicos;
  var date = req.body.fecha;

  var article = userModel.setAllarticle(req.param('articleId'), id_autor, tittle, content, tags, topics, date);
  res.json(article.toJSON());
}

//hay que tocar los nombres
function setUsern(req, res) {
  var username = req.body.username;
  res.json(userModel.setUser(req.param('userId'), username));
}


function delUSer(req, res) {
  userModel.deluser(req.params.userId);
  //req.params.userId parametro introducido en la URL
  res.send('User ' + req.params.userId + ' removed.');
}

function delArticle(req, res) {
  userModel.delarticle(req.params.articleId);
  //req.params.userId parametro introducido en la URL
  res.send('Article ' + req.params.articleId + ' removed.');
}

function getUser(req, res) {
  var userId = req.param('userId');
  globalManager.getUserById(userId, function(err, result){
    if(result){
      res.json(result);
    }else{
      next(new Error(new Error(userId + 'as user id does not exist')));
    }
  });
}

function getArticle(req, res) {
  res.json(userModel.getarticle(req.param('articleId')));
}

function getAllusers(req, res) {
  res.json(userModel.getAlluser());
}

function getAllarticles(req, res) {
  res.json(userModel.getAllarticle());
}

/*function checkScoreExists (req, res, next, scoreId) {
  var score = scoreModel.get(scoreId);
  if (score) {
    req.score = score;
    next();
  } else {
    next(new Error(userId + ' not exists'));
  }
}*/

module.exports = router;
