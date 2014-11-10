var express = require('express');
var router = express.Router();

var userModel = require('../model/users');
//usermodel contendra el export de users, que es el creat, get, del, delall


/* ROUTES */
router.post('/user', createUser);
router.post('/article', createArticle);//creacion de un articulo VACIO

router.put('/article/:articleId', setAllarticleparams);//echo
router.put('/:userId', setUsern);//echo

router.delete('/user/:userId', delUSer);//echo
router.delete('/article/:articleId', delArticle);//echo

router.get('/user/:userId', getUser);//echo
router.get('/article/:articleId', getArticle);//echo
router.get('/user', getAllusers);//echo
router.get('/article', getAllarticles);//echo

/* END ROUTES */

/* PARAMS  */
//router.param('userId', checkScoreExists);
/* END PARAMS */

//todas las funciones que ejecuta expres tienen un parametro request y un response
function createUser(req, res) {
  var user = userModel.createuser();
	res.json(user.toJSON());
}

function createArticle(req, res) {
  var user = userModel.createarticle();
  res.json(user.toJSON());
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
	res.json(userModel.getuser(req.param('userId')));
  //req.param('userId') contiene el dato que le hemos puesto en la URL
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
