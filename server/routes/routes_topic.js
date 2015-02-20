var express = require('express');
var router = express.Router();
var topicManager = require('../manager/manager_topic');

function worker(io) {

  //topics
  router.get('/topic', getTopicsByLetter);
  router.get('/topic/:topicId', getTopic);
  router.post('/topic', createTopic);
  router.put('/topic/:topicId', setTopic);
  router.delete('/topic/:topicId', delTopic);
  router.delete('/deleteall', delallTopic);

  function createTopic(req, res) {
    var temporalTopic = {
      name : req.body.name,
    };
    topicManager.createTopic(temporalTopic, function(err, result){
      res.json(result);
    });
  }

  function getTopic(req, res) {
    var topicId = req.param('topicId');
    topicManager.getTopic(topicId, function(err, result){
      if(result){
        res.json(result);
      }else{
        next(new Error(new Error(topicId + 'as topic id does not exist')));
      }
    });
  }

//como no vamos a recibir todos los los topics, vamos a recibirlos en funcion de la primeras letras
  function getTopicsByLetter(req, res) {
    var letter = req.param('letter');
    topicManager.getTopicsByLetter(letter, function(err, result){
      res.json(result);
    });
  }

  function setTopic(req, res) {
    var topicId = req.param('topicId');

    var Topic={
      "name" : req.body.name
    };

    topicManager.setTopic(topicId, Topic, function(err, result){
      if(result === null){
          next(new Error(new Error('Specified ID ' + topicId + ' does not exist')));
      }else{
          res.json(result);
      }
    });
  }

  function delTopic(req, res) {
    var topicId = req.param('topicId');

    topicManager.delTopic(topicId, function(err, result){
      if(result === null){
          next(new Error(new Error('Specified ID ' + topicId + ' does not exist')));
      }else{
          res.send('Topic ' + topicId + ' removed.');
      }
    });
  }

  function delallTopic(req, res) {
    topicManager.delallTopic(function(err, result){
      if(result === null){
          next(new Error(new Error('Specified ID ' + topicId + ' does not exist')));
      }else{
          res.send('All topics were removed.');
      }
    });
  }

  return router;
}

module.exports = worker;
