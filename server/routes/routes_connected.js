var debug = require('debug')('pqr_connected');
var express = require('express');
var router = express.Router();
var connManager = require('../manager/manager_connected');

var ensureAuth = require('../middleware/sec').ensureAuthenticated;

var jwt = require('jsonwebtoken');
var jwtSecret = require('../util/config').jwtSecret;



function worker(io) {
    router.post('/connected', ensureAuth, emitConnection);
    router.post('/disconnected', ensureAuth, emitDisconnection);

    router.get('/initializedtb', initializedtb);
    // router.del('/removedtb', removedtb);

    function initializedtb(req, res){
      connManager.initializedtb(function(err, result){
        if(err){
          debug('Error creating dtb, already exists');
          res.status(404).send('Error creating dtb, already exists');
        }else{
          debug(result);
          res.json(result);
        }
      });
    }

    function emitConnection(req, res){
      var ourUser = req.globalIdOfUser;
      connManager.addConnected(ourUser, function(err, result){
        if(!err){
          connManager.getConnectedPpl(function(err, result){
            if(!err){
              io.alexEmit('userconnected', result);
              res.json(result);
            }else{
              res.status(404).send('The user could not be added');
            }
          });
        }
      });
    }


    function emitDisconnection(req, res){
      var ourUser = req.globalIdOfUser;
      connManager.delConnected(ourUser, function(err, result){
        if(!err){
          connManager.getConnectedPpl(function(err, result){
            if(!err){
              io.alexEmit('userdisconnected', result);
              res.json(result);
            }else{
              res.status(404).send('The user could not be added');
            }
          });
        }
      });
    }

  return router;
}

module.exports = worker;
