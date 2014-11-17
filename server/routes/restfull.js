var express = require('express');
var router = express.Router();

var userManager = require('../model/userMethods');

/* VALID ROUTES TO API */

router.post('/user', createUser);
router.get('/user/:userId', getUser);//necho
router.get('/user', getAllusers);//necho
router.put('/user/:userId', setUser);//nech
router.delete('/user/:userId', delUser);//necho



/*
router.post('/article', createArticle);//necho
router.get('/article/:articleId', getArticle);//necho
router.get('/article', getAllarticles);//necho
router.put('/article/:articleId', setAllarticleparams);//necho
router.delete('/article/:articleId', delArticle);//necho
*/

/* END ROUTES */



//pasamos de tener una respuesta sincrona a una asincrona, por lo que los resultados
//se dan dentro de una funcion con "posibilidad" de error
function createUser(req, res) {
  userManager.createuser(function(err, result){
    res.json(result);
  });
}

function getUser(req, res) {
  userManager.createuser(function(err, result){
    res.json(result);
  });
}

function setUser(req, res) {
    var general={
    var username = req.body.username;
    var name= req.body.name;
    var mail = req.body.mail;
    var password = req.body.password;
    var bdate = req.body.bdate;
}
    res.json(userModel.setUser(req.param('userId'), username));
}

/*
function createArticle(req, res) {
  globalManager.createarticle(function(err, result){
    res.json(result);
  });
}*/

/*
function setAllarticleparams(req, res) {
  var id_autor = req.body.autor;
  var tittle = req.body.titulo;
  var content = req.body.contenido;
  var tags = req.body.t;
  var topics = req.body.topicos;
  var date = req.body.fecha;

  var article = userModel.setAllarticle(req.param('articleId'), id_autor, tittle, content, tags, topics, date);
  res.json(article.toJSON());
}*/

//hay que tocar los nombres


function delUser(req, res) {
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
  userManager.getUserById(userId, function(err, result){
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
