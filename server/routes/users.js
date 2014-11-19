var express = require('express');
var router = express.Router();
var userManager = require('../manager/userMethods');

//users
router.post('/user', createUser);
router.get('/user/:userId', getUser);
router.get('/user', getAllUsers);
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
  userManager.getUser(userId, function(err, result){
    if(result){
      res.json(result);
    }else{
      next(new Error(new Error(userId + 'as user id does not exist')));
    }
  });
}

function getAllUsers(req, res) {
  userManager.getAllUsers(function(err, result){
    res.json(result);
  });
}

function setUser(req, res) {
  var userId = req.param('userId');
  var User={
    $set:{}
  };
  
  User.$set[username]=  req.body.username;
  User.$set[name]=  req.body.name;
  User.$set[mail]= req.body.mail;
  User.$set[password]=  req.body.password;
  User.$set[bdate]= req.body.bdate;

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