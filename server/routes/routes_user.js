var debug = require('debug')('pqr_db');
var express = require('express');
var router = express.Router();
var userManager = require('../manager/manager_user');

//users
router.post('/user', createUser);
router.get('/user/:userId', getUser);
router.get('/user', getUsersAll);
router.put('/user/:userId', setUser);
router.delete('/user/:userId', delUser);

//pasamos de tener una respuesta sincrona a una asincrona, por lo que los resultados
//se dan dentro de una funcion con "posibilidad" de error
function createUser(req, res) {
  userManager.createUser(function(err, result){
    res.json(result);
  });
}

function getUser(req, res) {
  var userId = req.param('userId');
  debug('Showing user ' + userId);
  userManager.getUser(userId, function(err, result){
    if(result){
      debug('Time of response ->');
      res.json(result);
    }else{
      next(new Error(new Error(userId + 'as user id does not exist')));
    }
  });
}

function getUsersAll(req, res) {
  debug('Showing all users');
  userManager.getUsersAll(function(err, result){
    debug('Time of response ->');
    res.json(result);
  });
}

function setUser(req, res) {
  var userId = req.param('userId');
  var User={
    "username": req.body.username,
    "name": req.body.name,
    "mail": req.body.mail,
    "password": req.body.password,
    "bdate": req.body.bdate
  };

  userManager.setUser(userId, User, function(err, result){
    if(result === null){
        next(new Error(new Error('Specified ID ' + userId + ' does not exist')));
    }else{
        res.json(result);
    }
  });
}

function delUser(req, res) {
  var userId = req.param('userId');

  userManager.delUser(userId, function(err, result){
    if(result === null){
        next(new Error(new Error('Specified ID ' + userId + ' does not exist')));
    }else{
        res.send('User ' + userId + ' removed.');
    }
  });
}

module.exports = router;
