var debug = require('debug')('pqr_db');
var express = require('express');
var router = express.Router();
var userManager = require('../manager/manager_user');

function worker(io) {

  //users
  router.post('/user', createUser);
  router.get('/user/:userId', getUser);
  router.get('/user', getUsersAll);
  router.get('/validateuser', validateUser);
  router.get('/verifyUsername', verifyUsername);
  router.get('/verifyEmail', verifyEmail);
  router.put('/user/:userId', setUser);
  router.delete('/user/:userId', delUser);

  //pasamos de tener una respuesta sincrona a una asincrona, por lo que los resultados
  function createUser(req, res) {
    var User={
    };
    if(req.body.username!==undefined){
       User["username"]=req.body.username;
     }else{
       User["username"]="";
     }
    if(req.body.name!==undefined){
       User["name"]=req.body.name;
     }else{
       User["name"]="";
     }
    if(req.body.mail!==undefined){
       User["mail"]=req.body.mail;
     }else{
       User["mail"]="";
     }
    if(req.body.password!==undefined){
       User["password"]=req.body.password;
     }else{
       User["password"]="";
     }
    if(req.body.bdate!==undefined){
       User["bdate"]=req.body.bdate;
     }else{
       User["bdate"]="";
     }

    userManager.createUser(User,function(err, result){
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

  function verifyUsername(req, res){
    if(req.query.username!==undefined){
      userManager.verifyUsername(req.query.username, function(err, result){
        if(result[0] !== undefined){
          res.json(result);
        }else{
          if(err !== null){
            res.status(409).send('Username does not exist!');
          }else{
            res.status(409).send('Username does not exist!');
          }
        }
      });
    }else{
      res.status(409).send('No data provided!');
    }
  }

  function verifyEmail(req, res){
    if(req.query.email!==undefined){
      userManager.verifyEmail(req.query.email, function(err, result){
        if(result[0] !== undefined){
          res.json(result);
        }else{
          if(err !== null){
            res.status(409).send('Email does not exist!');
          }else{
            res.status(409).send('Email does not exist!');
          }
        }
      });
    }else{
      res.status(409).send('No data provided!');
    }
  }

  function setUser(req, res) {
    console.log(req.body);
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

  return router;
}

module.exports = worker;
