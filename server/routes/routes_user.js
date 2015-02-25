var debug = require('debug')('pqr_db');
var express = require('express');
var router = express.Router();
var userManager = require('../manager/manager_user');

var ensureAuth = require('../middleware/sec').ensureAuthenticated;
var ensureOwner = require('../middleware/sec').ensureOwner;

var jwt = require('jsonwebtoken');
var jwtSecret = require('../util/config').jwtSecret;



function worker(io) {

  //users
  router.post('/user',  createUser);
  router.post('/changedsocialmedia', ensureAuth, changedsocialmedia);
  router.post('/getAllContacts', getAllContacts);
  router.get('/profile', ensureAuth, getProfile);
  router.get('/user/:userId', getUser);
  router.get('/user', getUsersAll);
  router.get('/validateUserByName', validateUserByName);
  router.get('/validateUserByEmail', validateUserByEmail);
  router.get('/verifyUsername', verifyUsername);
  router.get('/verifyEmail', verifyEmail);
  router.put('/user/:userId', ensureAuth, setUser);
  router.delete('/user/:userId', ensureAuth, delUser);
  router.delete('/deleteAll', delUserAll);//provisional

  router.post('/follow',  ensureAuth, followUser);
  router.post('/unfollow',  ensureAuth, unfollowUser);

  function getAllContacts(req, res) {
    var values = req.body.values;

    if(values !== undefined){
      userManager.getAllContacts(values,function(err, result){
        res.json(result);
      });
    }else{
      res.status(404).send('The values are undefined');
    }

  }

  function changedsocialmedia(req, res) {
    var id = req.globalIdOfUser;

    var campo = req.body.campo;
    var valor = req.body.valor;

    userManager.changedsocialmedia(id, campo, valor,function(err, result){
      res.json(result);
    });
  }


  function followUser(req, res){
    var ourUser = req.globalIdOfUser;
    var extUser = req.body.toFollow;


    userManager.followUser(ourUser, extUser,function(err, result){
      userManager.addfollower(extUser, ourUser,function(err, result){
        result.who = ourUser;
        io.alexEmit('followingonemore', result);
      });
      result.who = extUser;
      io.alexEmit('Ifollowing', result);
      res.json(result);
    });
  }

  function unfollowUser(req, res){
    var ourUser = req.globalIdOfUser;
    var extUser = req.body.toUnFollow;

    userManager.unfollowUser(ourUser, extUser,function(err, result){
      userManager.deletefollower(extUser, ourUser,function(err, result){
        result.who = ourUser;
        io.alexEmit('followingoneless', result);
      });
      result.who = extUser;
      io.alexEmit('Iunfollowing', result);
      res.json(result);
    });
  }

  //pasamos de tener una respuesta sincrona a una asincrona, por lo que los resultados
  function createUser(req, res) {
    var User={
    };
    if(req.body.username!==undefined){
      User["username"]=req.body.username;
    } else {
      User["username"]="";
    }
    if(req.body.name!==undefined){
      User["name"]=req.body.name;
    } else {
      User["name"]="";
    }
    if(req.body.mail!==undefined){
      User["email"]=req.body.mail;
    } else {
      User["email"]="";
    }
    if(req.body.password!==undefined){
      User["password"]=req.body.password;
    } else {
      User["password"]="";
    }
    if(req.body.bdate!==undefined){
      User["bdate"]=req.body.bdate;
    } else {
      User["bdate"]="";
    }

    userManager.createUser(User,function(err, result){
      var token = jwt.sign(result, jwtSecret);
      res.json(token);
    });
  }

  function getProfile(req, res) {
    userManager.getUser(req.globalIdOfUser, function(err, result){
      if(result){
        debug('Time of response ->');
        res.json(result);
      }else{
        res.status(404).send('User doesn"t exist');
      }
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
        res.status(404).send('User doesn"t exist');
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

  function validateUserByName(req, res, next){
    if (req.query.username !== undefined && req.query.password !== undefined) {
      userManager.validateUserByName(req.query.username, req.query.password, function(err, result){
        if (result[0] !== undefined) {
          var token = jwt.sign(result, jwtSecret);
          res.json(token);
        } else {
          if (err !== null) {
            next(new Error(err));
          } else {
            next(new Error('Username or password incorrect:'));
          }
        }
      });
    }else{
      next(new Error('There was no data provided:'));
    }
  }

  function validateUserByEmail(req, res, next){
    if (req.query.email !== undefined && req.query.password !== undefined) {
      userManager.validateUserByEmail(req.query.email, req.query.password, function(err, result){
        if (result[0] !== undefined) {
          var token = jwt.sign(result, jwtSecret);
          res.json(token);
        } else {
          if (err !== null) {
            next(new Error(err));
          } else {
            next(new Error('Email or password incorrect:'));
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
    var userId = (req.globalIdOfUser!==undefined) ? req.globalIdOfUser : res.status(401).send('Server internal Error');;

    var User={
      $set:{
      }
    };

    if(req.body.username !== undefined){
      User.$set["username"] = req.body.username;
    }
    if(req.body.name !== undefined){
      User.$set["name"] = req.body.name;
    }
    if(req.body.mail !== undefined){
      User.$set["email"] = req.body.mail;
    }
    if(req.body.password !== undefined){
      User.$set["password"] = req.body.password;
    }
    if(req.body.bdate !== undefined){
      User.$set["bdate"] = req.body.bdate;
    }

    userManager.setUser(userId, User, function(err, result){
      if(result === null){
        res.status(401).send(err);
      }else{
        res.json(result);
      }
    });
  }

  function delUser(req, res) {
    var userId = req.globalIdOfUser;

    userManager.delUser(userId, function(err, result){
      if(result === null){
          next(new Error(new Error('Specified ID ' + userId + ' does not exist')));
      }else{
          res.send('User ' + userId + ' removed.');
      }
    });
  }

  function delUserAll(req, res) {
    debug('Deleting all Users');
    userManager.delUserAll(function(err, result){
        if(result === null){
          res.status(404).send('There was no users in database');
        }else{
          res.send('All users were removed');
        }
      });
  }

  return router;
}

module.exports = worker;
