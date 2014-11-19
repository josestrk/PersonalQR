var express = require('express');
var router = express.Router();
var topicManager = require('../manager/topicMethods');

//topics
router.post('/topic', createTopic);
router.get('/topic/:topicId', getTopic);
router.get('/topic', getAllTopics);
router.put('/topic/:topicId', setTopic);
router.delete('/topic/:topicId', delTopic);

function createTopic(req, res) {
  topicManager.createTopic(function(err, result){
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

function getAllTopics(req, res) {
  topicManager.getAllTopics(function(err, result){
    res.json(result);
  });
}

function setTopic(req, res) {
  var topicId = req.param('topicId');
  var Topic={
    $set:{}
  };

  Topic.$set[name]= req.body.titulo;

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

module.exports = router;
