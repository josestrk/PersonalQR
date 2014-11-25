var debug = require('debug')('pqr_db');
var express = require('express');
var router = express.Router();
var userManager = require('../manager/manager_user');

//users
router.post('/user', createUser);
router.get('/user/:userId', getUser);
router.get('/user', getUsersAll);
router.get('/validateuser', validateUser);
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

function validateUser(req, res, next){
  if(req.query.mail!==undefined && req.query.password!==undefined){
    userManager.validateUser(req.query.mail, req.query.password, function(err, result){
      if(result[0] !== undefined){
        res.json(result);
      }else{
        if(err !== null){
          next(new Error(err));
        }else{
          next(new Error('Mail or password incorrect:'));
        }
      }
    });
  }else{
    next(new Error('There was no data provided:'));
  }
}

function setUser(req, res) {
  var userId = req.param('userId');

  var User={
    $set:{
    }
  };

  if(req.body.username!==undefined){
     User.$set["username"]=req.body.username;
   }
  if(req.body.name!==undefined){
     User.$set["name"]=req.body.name;
   }
  if(req.body.mail!==undefined){
     User.$set["mail"]=req.body.mail;
   }
  if(req.body.password!==undefined){
     User.$set["password"]=req.body.password;
   }
  if(req.body.bdate!==undefined){
     User.$set["bdate"]=req.body.bdate;
   }

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
