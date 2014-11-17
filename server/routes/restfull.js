var express = require('express');
var router = express.Router();

var userManager = require('../model/userMethods');

/* VALID ROUTES TO API */

router.post('/user', createUser);
router.get('/user/:userId', getUser);
router.get('/user', getAllUsers);
router.put('/user/:userId', setUser);
router.delete('/user/:userId', delUser);

/*TODO
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
  userManager.createUser(function(err, result){
    res.json(result);
  });
}

function getUser(req, res) {
  var userId = req.param('userId');
  userManager.getUser(userId, function(err, result){
    if(result){
      res.json(result);
    }else{
      next(new Error(new Error(userId + 'as user id does not exist')));
    }
  });
}

function getAllUsers(req, res) {
  userManager.getAllUser(function(err, result){
    res.json(result);
  });
}

function setUser(req, res) {
    var userId = req.param('userId');
    var general={
        username:  req.body.username,
        name:  req.body.name,
        mail: req.body.mail,
        password:  req.body.password,
        bdate: req.body.bdate
        }
   userManager.setUser(req.param('userId'), general, function(err, result){
        if(result === null){
            next(new Error(new Error(userId+'specified id does not exist')));
        }else{
            res.json(result);
        }
    });
}

function delUser(req, res) {
    var userId = req.param('userId');
    
    userManager.delUser(userId, function(err, result){
        if(result === null){
            next(new Error(new Error(userId+'specified id does not exist')));
        }else{
            res.send('User ' + userId + ' removed.');
        }
    });
    //req.params.userId parametro introducido en la URL
   
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
  var title = req.body.titulo;
  var content = req.body.contenido;
  var tags = req.body.t;
  var topics = req.body.topicos;
  var date = req.body.fecha;

  var article = userModel.setAllarticle(req.param('articleId'), id_autor, title, content, tags, topics, date);
  res.json(article.toJSON());
}*/
/*
function delArticle(req, res) {
  userModel.delarticle(req.params.articleId);
  //req.params.userId parametro introducido en la URL
  res.send('Article ' + req.params.articleId + ' removed.');
}

function getArticle(req, res) {
  res.json(userModel.getarticle(req.param('articleId')));
}

function getAllusers(req, res) {
  res.json(userModel.getAlluser());
}

function getAllarticles(req, res) {
  res.json(userModel.getAllarticle());
}*/

module.exports = router;
